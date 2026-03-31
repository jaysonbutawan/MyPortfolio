import { Injectable, signal } from '@angular/core';

export interface HeroData {
  name: string;
  role: string;
  summary: string;
  statusBadge: string;
}

export interface AboutData {
  paragraphs: string[];
  details: { icon: string; label: string; value: string }[];
}

export interface ExperienceItem {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

export interface ProjectItem {
  id: string;
  icon: string;
  type: string;
  title: string;
  description: string;
  stack: string[];
  gradient: string;
}

export interface EducationItem {
  id: string;
  year: string;
  degree: string;
  school: string;
  note: string;
  icon: string;
}

export interface ContactData {
  intro: string;
  links: { icon: string; label: string; value: string; href: string }[];
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  educations: EducationItem[];
  contact: ContactData;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  /** All portfolio data — reactive signal */
  data = signal<PortfolioData>(this.getDefaultData());

  /** Update a specific section */
  updateHero(hero: HeroData): void {
    this.data.update((d) => ({ ...d, hero }));
    this.saveToBackend('hero', hero);
  }

  updateAbout(about: AboutData): void {
    this.data.update((d) => ({ ...d, about }));
    this.saveToBackend('about', about);
  }

  updateExperience(experiences: ExperienceItem[]): void {
    this.data.update((d) => ({ ...d, experiences }));
    this.saveToBackend('experiences', experiences);
  }

  updateProject(projects: ProjectItem[]): void {
    this.data.update((d) => ({ ...d, projects }));
    this.saveToBackend('projects', projects);
  }

  updateEducation(educations: EducationItem[]): void {
    this.data.update((d) => ({ ...d, educations }));
    this.saveToBackend('educations', educations);
  }

  updateContact(contact: ContactData): void {
    this.data.update((d) => ({ ...d, contact }));
    this.saveToBackend('contact', contact);
  }

  /** Replace with actual HTTP call */
  private saveToBackend(section: string, payload: unknown): void {
    // this.http.put(`/api/portfolio/${section}`, payload).subscribe();
    console.log(`[PortfolioService] Saved ${section}:`, payload);
  }

  /** Load from API on init — replace with HTTP call */
  loadFromBackend(): void {
    // this.http.get<PortfolioData>('/api/portfolio').subscribe(data => this.data.set(data));
  }

  private getDefaultData(): PortfolioData {
    return {
      hero: {
        name: 'Jayson Butawan',
        role: 'Full-Stack Developer',
        summary:
          'I architect and build performant web applications with clean code, modern frameworks, and a deep focus on user experience.',
        statusBadge: 'Available for opportunities',
      },
      about: {
        paragraphs: [
          "I'm a full-stack developer with 5+ years of experience building web applications that are both beautiful and functional.",
          "I thrive on solving complex technical challenges and turning ideas into production-ready products.",
        ],
        details: [
          { icon: '📍', label: 'Location', value: 'Manila, Philippines' },
          { icon: '💼', label: 'Specialization', value: 'Full-Stack Web Development' },
          { icon: '🎯', label: 'Focus', value: 'Angular · Laravel · REST APIs' },
          { icon: '🌐', label: 'Languages', value: 'English · Filipino' },
        ],
      },
      experiences: [],
      projects: [],
      educations: [],
      contact: {
        intro: "I'm always open to discussing new projects, creative ideas, or opportunities.",
        links: [],
      },
    };
  }
}
