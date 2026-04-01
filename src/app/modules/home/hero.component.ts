import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroOrbComponent } from './orb/orb.component';
import { TechStackBarComponent } from './tech-stack/tech-stack.component';
import { InlineEditComponent } from '../../shared/components/inline-edit/inline-edit.component';
import { HeroService } from './hero.service';
import { AuthService } from '../../core/services/auth.service';

export interface HeroData {
  name: string;
  role: string;
  summary: string;
  statusBadge: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HeroOrbComponent, TechStackBarComponent, InlineEditComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  private heroService = inject(HeroService);
  auth = inject(AuthService);

  hero = signal<HeroData>({
    name: '',
    role: '',
    summary: '',
    statusBadge: ''
  });

  ngOnInit(): void {
    this.heroService.getHero().subscribe({
      next: (res) => {
        this.hero.set({
          name: res.name,
          role: res.role,
          summary: res.summary,
          statusBadge: res.status_badge,
        });
      },
      error: (err) => console.error('Failed to load hero:', err),
    });
  }

  updateField(field: keyof HeroData, value: string): void {
    // Optimistic update
    const updated = { ...this.hero(), [field]: value };
    this.hero.set(updated);

    // Save to backend
    this.heroService.updateHero(updated).subscribe({
      next: (res) => {
        this.hero.set({
          name: res.name,
          role: res.role,
          summary: res.summary,
          statusBadge: res.status_badge,
        });
      },
      error: (err) => console.error('Failed to save hero:', err),
    });
  }
}
