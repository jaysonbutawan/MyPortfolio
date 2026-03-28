import {
  Component,
  AfterViewInit,
  OnDestroy,
  QueryList,
  ElementRef,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  icon: string;
  type: string;
  title: string;
  description: string;
  stack: string[];
  gradient: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  private observer: IntersectionObserver | null = null;

  projects: Project[] = [
    {
      icon: '📊',
      type: 'Web Application',
      title: 'Enterprise HR Management System',
      description:
        'A complete human resource platform with employee management, payroll processing, attendance tracking, and automated report generation for 500+ employees.',
      stack: ['Angular', 'Laravel', 'MySQL', 'REST API'],
      gradient: 'from-[#1a1a4e] to-[#2d1b69]',
    },
    {
      icon: '🛒',
      type: 'E-Commerce Platform',
      title: 'Multi-Vendor Marketplace',
      description:
        'A scalable marketplace supporting multiple vendors with real-time inventory, integrated payment (Stripe/PayPal), order tracking, and admin analytics dashboard.',
      stack: ['Angular', 'Laravel', 'Stripe API', 'Redis'],
      gradient: 'from-[#0d2f4f] to-[#1a4a3a]',
    },
    {
      icon: '📋',
      type: 'Management System',
      title: 'Project Tracker & Kanban Board',
      description:
        'Real-time project management tool with drag-and-drop kanban boards, task assignments, time tracking, and automated notifications via WebSockets.',
      stack: ['Angular', 'Node.js', 'Socket.io', 'MongoDB'],
      gradient: 'from-[#3d1a1a] to-[#4a2d1a]',
    },
    {
      icon: '🏥',
      type: 'Healthcare System',
      title: 'Clinic Appointment System',
      description:
        'Digital appointment scheduling platform for medical clinics with patient records, doctor availability, SMS reminders, and prescription management.',
      stack: ['Angular', 'Laravel', 'MySQL', 'Twilio API'],
      gradient: 'from-[#1a3d1a] to-[#1a2d4a]',
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    this.projectCards.forEach((card) => {
      this.observer!.observe(card.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
