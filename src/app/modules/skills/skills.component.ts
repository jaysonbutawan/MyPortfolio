import {
  Component,
  AfterViewInit,
  OnDestroy,
  QueryList,
  ElementRef,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  percent: number;
  animated: boolean;
}

interface SkillCategory {
  icon: string;
  iconBg: string;
  title: string;
  skills: Skill[];
  tags: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('skillCard') skillCards!: QueryList<ElementRef>;

  private observer: IntersectionObserver | null = null;

  categories: SkillCategory[] = [
    {
      icon: '⚡',
      iconBg: 'bg-[rgba(91,141,239,0.1)]',
      title: 'Frontend',
      skills: [
        { name: 'Angular / TypeScript', percent: 80, animated: false },
        { name: 'HTML / CSS / TailwindCSS', percent: 85, animated: false },
        { name: 'JavaScript (ES6+)', percent: 60, animated: false },
        { name: 'Flutter', percent: 88, animated: false },
      ],
      tags: ['RxJS', 'NgRx', 'Bootstrap', 'Responsive','Mobile Applications'],
    },
    {
      icon: '🔧',
      iconBg: 'bg-[rgba(167,139,250,0.1)]',
      title: 'Backend',
      skills: [
        { name: 'PHP / Laravel', percent: 90, animated: false },
        { name: 'MySQL/PostgreSQL / Database Design', percent: 88, animated: false },
        { name: 'REST API Development', percent: 70, animated: false },
        { name: 'Node.js', percent: 65, animated: false },
      ],
      tags: ['Caching', 'Sanctum', 'Redis', 'Queue Jobs','Idempotent APIs'],
    },
    {
      icon: '🚀',
      iconBg: 'bg-[rgba(52,211,153,0.1)]',
      title: 'Tools & DevOps',
      skills: [
        { name: 'Git / GitHub', percent: 93, animated: false },
        { name: 'Docker', percent: 60, animated: false },
        { name: 'CI/CD Pipelines', percent: 70, animated: false },
      ],
      tags: ['VS Code', 'Postman', 'Figma', 'Jira'],
    },
  ];

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find which card index became visible
            const index = this.skillCards
              .toArray()
              .findIndex((card) => card.nativeElement === entry.target);

            if (index >= 0) {
              // Animate skill bars with a slight delay
              setTimeout(() => {
                this.categories[index].skills.forEach((skill) => {
                  skill.animated = true;
                });
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    this.skillCards.forEach((card) => {
      this.observer!.observe(card.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
