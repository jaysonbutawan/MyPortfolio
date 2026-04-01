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
import { EducationService, EducationApiResponse } from './education.service';
import { AuthService } from '../../core/services/auth.service';

interface Education {
  id: number;
  year: string;
  degree: string;
  school: string;
  note: string;
  icon: string;
  order: number;
}

function mapApiToEducation(res: EducationApiResponse): Education {
  return {
    id: res.id,
    year: res.year ?? '',
    degree: res.degree ?? '',
    school: res.school ?? '',
    note: res.note ?? '',
    icon: res.icon ?? '',
    order: res.order,
  };
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, InlineEditComponent],
  templateUrl: './education.component.html',
})
export class EducationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('eduCard') eduCards!: QueryList<ElementRef>;

  private educationService = inject(EducationService);
  auth = inject(AuthService);
  private observer: IntersectionObserver | null = null;

  educations = signal<Education[]>([]);
  isAdding = signal(false);
  deletingId = signal<number | null>(null);

  ngOnInit(): void {
    this.educationService.getAll().subscribe({
      next: (res) => {
        this.educations.set(res.map(mapApiToEducation));
        setTimeout(() => {
          this.eduCards.forEach((card) => this.observer?.observe(card.nativeElement));
        }, 100);
      },
      error: (err) => console.error('Failed to load educations:', err),
    });
  }

  updateField(id: number, field: keyof Omit<Education, 'id' | 'order'>, value: string): void {
    this.educations.update((list) =>
      list.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );

    this.educationService.update(id, { [field]: value }).subscribe({
      next: (res) => {
        this.educations.update((list) =>
          list.map((e) => (e.id === res.id ? mapApiToEducation(res) : e))
        );
      },
      error: (err) => console.error('Failed to save education:', err),
    });
  }

  addEducation(): void {
    if (this.isAdding()) return;
    this.isAdding.set(true);

    const order = this.educations().length + 1;
    this.educationService.store({ order }).subscribe({
      next: (res) => {
        this.educations.update((list) => [...list, mapApiToEducation(res)]);
        this.isAdding.set(false);
        setTimeout(() => {
          const items = this.eduCards.toArray();
          const last = items[items.length - 1];
          if (last) {
            this.observer?.observe(last.nativeElement);
            last.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      },
      error: (err) => {
        console.error('Failed to create education:', err);
        this.isAdding.set(false);
      },
    });
  }

  deleteEducation(id: number): void {
    if (this.deletingId() !== null) return;
    this.deletingId.set(id);

    this.educationService.delete(id).subscribe({
      next: () => {
        this.educations.update((list) => list.filter((e) => e.id !== id));
        this.deletingId.set(null);
      },
      error: (err) => {
        console.error('Failed to delete education:', err);
        this.deletingId.set(null);
      },
    });
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    this.eduCards.forEach((card) => this.observer!.observe(card.nativeElement));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
