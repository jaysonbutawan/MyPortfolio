import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroOrbComponent } from './orb.component';
import { TechStackBarComponent } from './tech-stack/tech-stack.component';
import { EditableSectionComponent } from '../../shared/components/editable-section/editable-section.component';
import { HeroEditModalComponent } from './hero.edit-modal.component';
import { PortfolioService } from '../../core/services/portfolio.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    HeroOrbComponent,
    TechStackBarComponent,
    EditableSectionComponent,
    HeroEditModalComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  @ViewChild(HeroEditModalComponent) editModal!: HeroEditModalComponent;

  constructor(
    public portfolio: PortfolioService,
    public auth: AuthService
  ) {}

  /** Computed accessor for template readability */
  get hero() {
    return this.portfolio.data().hero;
  }

  openEditModal(): void {
    this.editModal.open();
  }
}
