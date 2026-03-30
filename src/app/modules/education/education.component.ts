import {
  Component,
  AfterViewInit,
  OnDestroy,
  QueryList,
  ElementRef,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Education {
  year: string;
  degree: string;
  school: string;
  note: string;
  icon: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
})
export class EducationComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('eduCard') eduCards!: QueryList<ElementRef>;

  private observer: IntersectionObserver | null = null;

  educations: Education[] = [
    {
      year: '2023 — Present',
      degree: 'BS in Information Technology',
      school: 'Aces Tagum College',
      note: "Specialized in web technologies and software engineering. Dean's Lister . Capstone project on real-time inventory management systems.",
      icon: '🎓',
    },
    {
      year: '',
      degree: '',
      school: '',
      note: '',
      icon: '📜',
    },
    {
      year: '',
      degree: '',
      school: '',
      note: '',
      icon: '☁️',
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
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    this.eduCards.forEach((card) => {
      this.observer!.observe(card.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
