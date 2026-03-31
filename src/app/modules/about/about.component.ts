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
import { AboutService, AboutData } from './about.service';
import { AuthService } from '../../core/services/auth.service';

interface AboutDetail {
  id: number;
  icon: string;
  label: string;
  value: string;
  gradient: string;
  iconBg: string;
}

const CARD_VISUAL_CONFIG = [
  { icon: '📍', gradient: 'from-red-500/20 to-red-600/5',   iconBg: 'from-[#ff4d4d]/20 to-[#ff4d4d]/5' },
  { icon: '💼', gradient: 'from-amber-500/20 to-amber-600/5', iconBg: 'from-[#f59e0b]/20 to-[#f59e0b]/5' },
  { icon: '🎯', gradient: 'from-rose-500/20 to-rose-600/5',  iconBg: 'from-[#f43f5e]/20 to-[#f43f5e]/5' },
  { icon: '🌐', gradient: 'from-cyan-500/20 to-cyan-600/5',  iconBg: 'from-[#06b6d4]/20 to-[#06b6d4]/5' },
];

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, InlineEditComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sectionHeader') sectionHeader!: ElementRef;
  @ViewChild('aboutText') aboutText!: ElementRef;
  @ViewChildren('detailCard') detailCards!: QueryList<ElementRef>;

  private aboutService = inject(AboutService);
  auth = inject(AuthService);

  private observer: IntersectionObserver | null = null;

  about = signal<AboutData>({
    section_label: 'About Me',
    heading_main: 'Crafting the',
    heading_highlight: 'digital future',
    description_top: '',
    description_bottom: '',
  });

  details = signal<AboutDetail[]>([]);

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe({
      next: (res) => {
        this.about.set({
          section_label: res.section_label,
          heading_main: res.heading_main,
          heading_highlight: res.heading_highlight,
          description_top: res.description_top,
          description_bottom: res.description_bottom,
        });
      },
      error: (err) => console.error('Failed to load about:', err),
    });

    this.aboutService.getCards().subscribe({
      next: (cards) => {
        this.details.set(
          cards.map((card, i) => ({
            id: card.id,
            label: card.label,
            value: card.value,
            ...CARD_VISUAL_CONFIG[i % CARD_VISUAL_CONFIG.length],
          }))
        );

        // Cards just rendered — observe them for scroll animation
        setTimeout(() => {
          this.detailCards.forEach((card) => {
            this.observer?.observe(card.nativeElement);
          });
        }, 100);
      },
      error: (err) => console.error('Failed to load detail cards:', err),
    });
  }

  updateField(field: keyof AboutData, value: string): void {
    const updated = { ...this.about(), [field]: value };
    this.about.set(updated);

    this.aboutService.updateAbout(updated).subscribe({
      next: (res) => {
        this.about.set({
          section_label: res.section_label,
          heading_main: res.heading_main,
          heading_highlight: res.heading_highlight,
          description_top: res.description_top,
          description_bottom: res.description_bottom,
        });
      },
      error: (err) => console.error('Failed to save about:', err),
    });
  }

  updateCard(id: number, field: 'label' | 'value', newValue: string): void {
    const current = this.details().find((d) => d.id === id);
    if (!current) return;

    this.details.update((cards) =>
      cards.map((c) => (c.id === id ? { ...c, [field]: newValue } : c))
    );

    const updated = { ...current, [field]: newValue };
    this.aboutService.updateCard(id, { label: updated.label, value: updated.value }).subscribe({
      next: (res) => {
        this.details.update((cards) =>
          cards.map((c) => (c.id === res.id ? { ...c, label: res.label, value: res.value } : c))
        );
      },
      error: (err) => console.error('Failed to save detail card:', err),
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

    if (this.aboutText) {
      this.observer.observe(this.aboutText.nativeElement);
    }

    // Static elements are observed here.
    // Cards are observed in ngOnInit after data loads (see setTimeout above).
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
