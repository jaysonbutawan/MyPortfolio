import {
  Component,
  AfterViewInit,
  QueryList,
  ElementRef,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  percent: number;
}

interface SkillCategory {
  title: string;
  icon: string;
  iconBg: string;
  skills: Skill[];
  tags: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements AfterViewInit {
  @ViewChildren('skillCard') skillCards!: QueryList<ElementRef>;

  categories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: '⚡',
      iconBg: 'bg-[rgba(91,141,239,0.1)]',
      skills: [
        { name: 'Angular / TypeScript', percent: 92 },
        { name: 'HTML / CSS / SCSS', percent: 95 },
        { name: 'JavaScript (ES6+)', percent: 90 },
        { name: 'TailwindCSS', percent: 88 },
      ],
      tags: ['RxJS', 'NgRx', 'Bootstrap', 'Responsive'],
    },
    {
      title: 'Backend',
      icon: '🔧',
      iconBg: 'bg-[rgba(167,139,250,0.1)]',
      skills: [
        { name: 'PHP / Laravel', percent: 90 },
        { name: 'MySQL / Database Design', percent: 88 },
        { name: 'REST API Development', percent: 92 },
        { name: 'Node.js', percent: 75 },
      ],
      tags: ['Eloquent', 'Sanctum', 'Redis', 'Queue Jobs'],
    },
    {
      title: 'Tools & DevOps',
      icon: '🚀',
      iconBg: 'bg-[rgba(52,211,153,0.1)]',
      skills: [
        { name: 'Git / GitHub', percent: 93 },
        { name: 'Docker', percent: 72 },
        { name: 'Linux / CLI', percent: 80 },
        { name: 'CI/CD Pipelines', percent: 70 },
      ],
      tags: ['VS Code', 'Postman', 'Figma', 'Jira'],
    },
  ];

  /** Animate skill bars when cards scroll into view */
  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll<HTMLElement>('.skill-fill');
            bars.forEach((bar) => {
              const width = bar.getAttribute('data-width');
              if (width) {
                bar.style.width = width + '%';
              }
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    this.skillCards.forEach((card) => {
      observer.observe(card.nativeElement);
    });
  }
}
