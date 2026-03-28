import {
  Component,
  AfterViewInit,
  OnDestroy,
  QueryList,
  ElementRef,
  ViewChildren,
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
  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef>;

  private observer: IntersectionObserver | null = null;

  experiences: Experience[] = [
    {
      date: 'Jan 2023 — Present',
      role: 'Senior Full-Stack Developer',
      company: 'TechVault Solutions',
      description:
        'Lead the development of enterprise-grade web applications using Angular 16+ and Laravel 10. Architect RESTful APIs serving 50k+ daily requests, implement CI/CD pipelines, and mentor a team of 4 junior developers.',
      tech: ['Angular', 'Laravel', 'MySQL', 'Docker', 'AWS'],
    },
    {
      date: 'Mar 2021 — Dec 2022',
      role: 'Full-Stack Developer',
      company: 'CloudBridge Digital',
      description:
        'Built and maintained multiple client-facing SaaS platforms. Designed database schemas for complex business logic, integrated third-party APIs (payment gateways, maps, notifications), and optimized front-end performance reducing load times by 40%.',
      tech: ['Angular', 'PHP', 'REST API', 'Git', 'TailwindCSS'],
    },
    {
      date: 'Jun 2019 — Feb 2021',
      role: 'Frontend Developer',
      company: 'Pixel & Code Studio',
      description:
        'Developed responsive web interfaces from Figma designs, implemented component-based architecture with Angular, and collaborated with backend teams to integrate APIs for real-time data dashboards.',
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
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    this.timelineItems.forEach((item) => {
      this.observer!.observe(item.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
