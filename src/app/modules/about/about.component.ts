import {
  Component,
  AfterViewInit,
  OnDestroy,
  QueryList,
  ElementRef,
  ViewChildren,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface AboutDetail {
  icon: string;
  label: string;
  value: string;
  gradient: string;
  iconBg: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionHeader') sectionHeader!: ElementRef;
  @ViewChild('aboutText') aboutText!: ElementRef;
  @ViewChildren('detailCard') detailCards!: QueryList<ElementRef>;

  private observer: IntersectionObserver | null = null;
  headerVisible = signal(false);
  textVisible = signal(false);

  details: AboutDetail[] = [
    {
      icon: '📍',
      label: 'Location',
      value: 'Tagum City, Davao del Norte, Philippines',
      gradient: 'from-red-500/20 to-red-600/5',
      iconBg: 'from-[#ff4d4d]/20 to-[#ff4d4d]/5',
    },
    {
      icon: '💼',
      label: 'Specialization',
      value: 'Full-Stack Web Development',
      gradient: 'from-amber-500/20 to-amber-600/5',
      iconBg: 'from-[#f59e0b]/20 to-[#f59e0b]/5',
    },
    {
      icon: '🎯',
      label: 'Focus',
      value: 'Angular · Laravel · REST APIs',
      gradient: 'from-rose-500/20 to-rose-600/5',
      iconBg: 'from-[#f43f5e]/20 to-[#f43f5e]/5',
    },
    {
      icon: '🌐',
      label: 'Languages',
      value: 'English · Filipino',
      gradient: 'from-cyan-500/20 to-cyan-600/5',
      iconBg: 'from-[#06b6d4]/20 to-[#06b6d4]/5',
    },
  ];

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

    // Observe header
    if (this.sectionHeader) {
      this.observer.observe(this.sectionHeader.nativeElement);
    }

    // Observe text block
    if (this.aboutText) {
      this.observer.observe(this.aboutText.nativeElement);
    }

    // Observe each card
    this.detailCards.forEach((card) => {
      this.observer!.observe(card.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
