import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  QueryList,
  ElementRef,
  ViewChildren,
  ViewChild,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineEditComponent } from '../../shared/components/inline-edit/inline-edit.component';
import { ExperienceService, ExperienceApiResponse } from './experience.service';
import { AuthService } from '../../core/services/auth.service';

interface Experience {
  id: number;
  date: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
  order: number;
}

function mapApiToExperience(res: ExperienceApiResponse): Experience {
  return {
    id: res.id,
    date: res.date ?? '',
    role: res.role ?? '',
    company: res.company ?? '',
    description: res.description ?? '',
    tech: res.tech ?? [],
    order: res.order,
  };
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, InlineEditComponent],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sectionHeader') sectionHeader!: ElementRef;
  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef>;

  private experienceService = inject(ExperienceService);
  auth = inject(AuthService);

  private observer: IntersectionObserver | null = null;

  experiences = signal<Experience[]>([]);
  isAdding = signal(false);
  deletingId = signal<number | null>(null);

 ngOnInit(): void {
  this.experienceService.getExperiences().subscribe({
    next: (res) => {
      this.experiences.set(res.map(mapApiToExperience));

      // Re-observe timeline items after Angular renders them
      setTimeout(() => {
        this.timelineItems.forEach((item) => {
          this.observer?.observe(item.nativeElement);
        });
      }, 100);
    },
    error: (err) => console.error('Failed to load experiences:', err),
  });
}

  techAsString(tech: string[]): string {
    return tech.join(', ');
  }

  updateField(id: number, field: keyof Omit<Experience, 'id' | 'order' | 'tech'>, value: string): void {
    const current = this.experiences().find((e) => e.id === id);
    if (!current) return;

    const updated = { ...current, [field]: value };

    // Optimistic update
    this.experiences.update((list) => list.map((e) => (e.id === id ? updated : e)));

    this.experienceService.updateExperience(id, { [field]: value }).subscribe({
      next: (res) => {
        this.experiences.update((list) =>
          list.map((e) => (e.id === res.id ? mapApiToExperience(res) : e))
        );
      },
      error: (err) => console.error('Failed to save experience:', err),
    });
  }

  deleteExperience(id: number): void {
    if (this.deletingId() !== null) return;
    this.deletingId.set(id);

    this.experienceService.deleteExperience(id).subscribe({
      next: () => {
        this.experiences.update((list) => list.filter((e) => e.id !== id));
        this.deletingId.set(null);
      },
      error: (err) => {
        console.error('Failed to delete experience:', err);
        this.deletingId.set(null);
      },
    });
  }

  addExperience(): void {
  if (this.isAdding()) return;
  this.isAdding.set(true);

  const order = this.experiences().length + 1;
  this.experienceService.storeExperience({
    date: '',
    role: '',
    company: '',
    description: '',
    tech: ['', ''],
    order,
  }).subscribe({
    next: (res) => {
      this.experiences.update((list) => [...list, mapApiToExperience(res)]);
      this.isAdding.set(false);

      // Observe + scroll to new card
      setTimeout(() => {
        const items = this.timelineItems.toArray();
        const lastItem = items[items.length - 1];
        if (lastItem) {
          this.observer?.observe(lastItem.nativeElement);
          lastItem.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }, 150);
    },
    error: (err) => {
      console.error('Failed to create experience:', err);
      this.isAdding.set(false);
    },
  });
}

  updateTech(id: number, raw: string): void {
    const tech = raw.split(',').map((t) => t.trim()).filter(Boolean);
    const current = this.experiences().find((e) => e.id === id);
    if (!current) return;

    // Optimistic update
    this.experiences.update((list) => list.map((e) => (e.id === id ? { ...e, tech } : e)));

    this.experienceService.updateExperience(id, { tech }).subscribe({
      next: (res) => {
        this.experiences.update((list) =>
          list.map((e) => (e.id === res.id ? mapApiToExperience(res) : e))
        );
      },
      error: (err) => console.error('Failed to save tech tags:', err),
    });
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    if (this.sectionHeader) {
      this.observer.observe(this.sectionHeader.nativeElement);
    }

    this.timelineItems.forEach((item) => {
      this.observer!.observe(item.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
