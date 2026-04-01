import { Component, AfterViewInit, OnDestroy, QueryList, ElementRef, ViewChildren, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SKILL_MAP, SKILL_PERCENT } from '../../shared/components/skill-map.constant';
import { TechStackService } from './skills.service';
import { AuthService } from '../../core/services/auth.service';

export interface Skill {
  id: number;
  name: string;
  is_active: boolean;
  sort_order: number;
  animated?: boolean;
  iconClass?: string;
  color?: string;
  percent?: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('skillCard') skillCards!: QueryList<ElementRef>;

  private techStackService = inject(TechStackService);
  auth = inject(AuthService);
  private observer: IntersectionObserver | null = null;

  skills = signal<Skill[]>([]);
  deletingId = signal<number | null>(null);
  isAdding = signal(false);
  showPicker = signal(false);
  pickerSearch = signal('');

  availableSkills = computed(() => {
    const existing = new Set(this.skills().map((s) => s.name));
    const search = this.pickerSearch().toLowerCase();
    return Object.keys(SKILL_MAP)
      .filter((name) => !existing.has(name))
      .filter((name) => !search || name.toLowerCase().includes(search))
      .map((name) => ({ name, ...SKILL_MAP[name] }));
  });

  ngOnInit(): void {
    this.techStackService.getAll().subscribe((data) => {
      this.skills.set(data.map((s) => this.resolveSkill(s)));
      setTimeout(() => this.startObserving(), 0);
    });
  }

  private resolveSkill(s: any): Skill {
    const meta = SKILL_MAP[s.name];
    return {
      ...s,
      animated: false,
      percent: SKILL_PERCENT,
      iconClass: meta?.iconClass ? `${meta.iconClass} colored` : 'devicon-devicon-plain',
      color: meta?.color ?? '#888888',
    };
  }

  addSkill(name: string): void {
    if (this.isAdding()) return;
    this.isAdding.set(true);

    const payload = {
      name,
      is_active: true,
      sort_order: this.skills().length + 1,
    };

    this.techStackService.create(payload as any).subscribe({
      next: (res) => {
        this.skills.update((list) => [...list, this.resolveSkill(res)]);
        this.isAdding.set(false);
        setTimeout(() => this.startObserving(), 100);
      },
      error: (err) => {
        console.error('Failed to add skill:', err);
        this.isAdding.set(false);
      },
    });
  }

  deleteSkill(id: number): void {
    if (this.deletingId() !== null) return;
    this.deletingId.set(id);

    this.techStackService.delete(id).subscribe({
      next: () => {
        this.skills.update((list) => list.filter((s) => s.id !== id));
        this.deletingId.set(null);
      },
      error: (err) => {
        console.error('Failed to delete skill:', err);
        this.deletingId.set(null);
      },
    });
  }

  togglePicker(): void {
    this.showPicker.update((v) => !v);
    if (!this.showPicker()) this.pickerSearch.set('');
  }

  onPickerSearch(event: Event): void {
    this.pickerSearch.set((event.target as HTMLInputElement).value);
  }

  private startObserving(): void {
    if (!this.observer) return;
    this.skillCards.forEach((card) => this.observer!.observe(card.nativeElement));
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = this.skillCards
              .toArray()
              .findIndex((card) => card.nativeElement === entry.target);
            if (index >= 0 && this.skills()[index]) {
              setTimeout(() => {
                this.skills.update((list) =>
                  list.map((s, i) => (i === index ? { ...s, animated: true } : s))
                );
              }, 100);
            }
          }
        });
      },
      { threshold: 0.2 }
    );
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
