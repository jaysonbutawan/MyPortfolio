import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TechStackService } from '../../skills/skills.service';
import { SKILL_MAP } from '../../../shared/components/skill-map.constant';

interface TechIcon {
  name: string;
  iconClass: string;
  color: string;
}

@Component({
  selector: 'app-tech-stack-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.css',
})
export class TechStackBarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  techIcons = signal<TechIcon[]>([]);
  isLoading = signal(true);
  isPaused = signal(false);

  constructor(private techStackService: TechStackService) {}

  ngOnInit(): void {
    this.techStackService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (skills) => {
          this.techIcons.set(
            skills.map((skill) => {
              const meta = SKILL_MAP[skill.name];
              return {
                name: skill.name,
                iconClass: meta ? `${meta.iconClass} colored` : 'devicon-devicon-plain',
                color: meta?.color ?? '#8a94a8',
              };
            })
          );
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMarqueeEnter(): void { this.isPaused.set(true); }
  onMarqueeLeave(): void { this.isPaused.set(false); }
}
