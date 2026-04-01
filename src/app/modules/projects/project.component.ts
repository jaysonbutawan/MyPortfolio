import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  QueryList,
  ElementRef,
  ViewChildren,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineEditComponent } from '../../shared/components/inline-edit/inline-edit.component';
import { ProjectService, ProjectApiResponse } from './project.service';
import { AuthService } from '../../core/services/auth.service';

interface Project {
  id: number;
  icon: string | null;    // base64 image string OR emoji/text fallback
  type: string;
  title: string;
  description: string;
  stack: string[];
  link: string;
  order: number;
  gradient: string;
}

const GRADIENT_CONFIG = [
  'from-[#1a1a4e] to-[#2d1b69]',
  'from-[#0d2f4f] to-[#1a4a3a]',
  'from-[#3d1a1a] to-[#4a2d1a]',
  'from-[#1a3d1a] to-[#1a2d4a]',
  'from-[#2d1a4a] to-[#1a2d3d]',
  'from-[#4a1a2d] to-[#1a4a4a]',
];

function mapApiToProject(res: ProjectApiResponse, index: number): Project {
  return {
    id: res.id,
    icon: res.icon ?? null,
    type: res.type ?? 'Project',
    title: res.title ?? '',
    description: res.description ?? '',
    stack: res.stack ?? [],
    link: res.link ?? '',
    order: res.order,
    gradient: GRADIENT_CONFIG[index % GRADIENT_CONFIG.length],
  };
}

/** Returns true if the icon value is a base64 image string */
export function isBase64Image(value: string | null): boolean {
  return !!value && value.startsWith('data:image/');
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, InlineEditComponent],
  templateUrl: './project.component.html',
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  private projectService = inject(ProjectService);
  auth = inject(AuthService);
  private observer: IntersectionObserver | null = null;

  projects    = signal<Project[]>([]);
  isAdding    = signal(false);
  deletingId  = signal<number | null>(null);
  uploadingId = signal<number | null>(null);

  // Expose helper to template
  isBase64Image = isBase64Image;

  ngOnInit(): void {
    this.projectService.getAll().subscribe({
      next: (res) => {
        this.projects.set(res.map((p, i) => mapApiToProject(p, i)));
        setTimeout(() => {
          this.projectCards.forEach((card) => this.observer?.observe(card.nativeElement));
        }, 100);
      },
      error: (err) => console.error('Failed to load projects:', err),
    });
  }

  // ─── Image Upload ────────────────────────────────────────────────────────────

  onImageSelected(event: Event, projectId: number): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.uploadingId.set(projectId);

    // Convert to base64, then save via the same update() method as all other fields
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string; // "data:image/png;base64,..."

      // Optimistic update — show preview immediately
      this.projects.update((list) =>
        list.map((p) => (p.id === projectId ? { ...p, icon: base64 } : p))
      );

      // Save to DB using the exact same update() method — no FormData, no extra endpoints
      this.projectService.update(projectId, { icon: base64 }).subscribe({
        next: (res) => {
          this.projects.update((list) =>
            list.map((p) =>
              p.id === res.id
                ? { ...mapApiToProject(res, list.findIndex((x) => x.id === res.id)), gradient: p.gradient }
                : p
            )
          );
          this.uploadingId.set(null);

          // Reset input so same file can be re-selected
          const input = event.target as HTMLInputElement;
          input.value = '';
        },
        error: (err) => {
          console.error('Failed to upload image:', err);
          // Revert optimistic update on error
          this.projects.update((list) =>
            list.map((p) => (p.id === projectId ? { ...p, icon: null } : p))
          );
          this.uploadingId.set(null);
        },
      });
    };

    reader.readAsDataURL(file);
  }

  // ─── Field Updates ───────────────────────────────────────────────────────────

  stackAsString(stack: string[]): string {
    return stack.join(', ');
  }

  updateField(
    id: number,
    field: keyof Omit<Project, 'id' | 'order' | 'stack' | 'gradient'>,
    value: string
  ): void {
    this.projects.update((list) =>
      list.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );

    this.projectService.update(id, { [field]: value }).subscribe({
      next: (res) => {
        this.projects.update((list) =>
          list.map((p) =>
            p.id === res.id
              ? { ...mapApiToProject(res, list.findIndex((x) => x.id === res.id)), gradient: p.gradient }
              : p
          )
        );
      },
      error: (err) => console.error('Failed to save project:', err),
    });
  }

  updateStack(id: number, raw: string): void {
    const stack = raw.split(',').map((t) => t.trim()).filter(Boolean);
    this.projects.update((list) =>
      list.map((p) => (p.id === id ? { ...p, stack } : p))
    );

    this.projectService.update(id, { stack }).subscribe({
      error: (err) => console.error('Failed to save stack:', err),
    });
  }

  // ─── Add / Delete ────────────────────────────────────────────────────────────

  addProject(): void {
    if (this.isAdding()) return;
    this.isAdding.set(true);

    const order = this.projects().length + 1;
    this.projectService.store({ order }).subscribe({
      next: (res) => {
        this.projects.update((list) => [...list, mapApiToProject(res, list.length)]);
        this.isAdding.set(false);
        setTimeout(() => {
          const items = this.projectCards.toArray();
          const last = items[items.length - 1];
          if (last) {
            this.observer?.observe(last.nativeElement);
            last.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      },
      error: (err) => {
        console.error('Failed to create project:', err);
        this.isAdding.set(false);
      },
    });
  }

  deleteProject(id: number): void {
    if (this.deletingId() !== null) return;
    this.deletingId.set(id);

    this.projectService.delete(id).subscribe({
      next: () => {
        this.projects.update((list) => list.filter((p) => p.id !== id));
        this.deletingId.set(null);
      },
      error: (err) => {
        console.error('Failed to delete project:', err);
        this.deletingId.set(null);
      },
    });
  }

  // ─── Lifecycle ───────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    this.projectCards.forEach((card) => this.observer!.observe(card.nativeElement));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
