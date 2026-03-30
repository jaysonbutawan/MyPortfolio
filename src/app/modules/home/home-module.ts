import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero.component';
import { AboutComponent } from "../about/about.component";
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceComponent } from "../experience/experience.component";
import { ProjectsComponent } from "../projects/project.component";
import { EducationComponent } from "../education/education.component";
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, AboutComponent, SkillsComponent, ExperienceComponent, ProjectsComponent, EducationComponent, ContactComponent],
  template: `
    <app-hero />
    <app-about />
    <app-skills />
    <app-experience />
    <app-projects />
    <app-education />
    <app-contact />
 `,
})
export class HomeComponent { }
