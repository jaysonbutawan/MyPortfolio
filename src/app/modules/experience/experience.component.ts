import {
  Component,
  AfterViewInit,
  OnDestroy,
  QueryList,
  ElementRef,
  ViewChildren,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  date: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionHeader') sectionHeader!: ElementRef;
  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef>;

  private observer: IntersectionObserver | null = null;

  experiences: Experience[] = [
    {
      date: 'Jan 2025 — Present',
      role: 'Full-Stack Developer',
      company: 'Theobrotect Solutions',
      description:
        'Lead the development of mobile & web applications using Angular for web and Flutter for mobile, and Laravel for backend.',
      tech: ['Angular', 'Laravel', 'PostgreSQL', 'Docker', 'CloudFlare', 'Flutter'],
    },
    {
      date: 'Mar 2024 — Dec 2024',
      role: 'Full-Stack Developer',
      company: '',
      description:
        '',
      tech: ['Angular', 'PHP', 'REST API', 'Git', 'TailwindCSS'],
    },
    {
      date: 'Jun 2023 — Feb 2024',
      role: '',
      company: '',
      description:
        '',
      tech: ['Angular', 'TypeScript', 'SCSS', 'Bootstrap'],
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

    // Observe timeline items
    this.timelineItems.forEach((item) => {
      this.observer!.observe(item.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
