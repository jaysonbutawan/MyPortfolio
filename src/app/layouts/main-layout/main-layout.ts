import { Component } from '@angular/core';
import { NavbarComponent } from '../nav-bar/nav-bar';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface TechIcon {
  id: number;
  iconClass: string;       // Devicon CSS class
  top: string;
  left: string;
  size: string;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
  // Random drift values for unique paths
  dx: number;
  dy: number;
  dx2: number;
  dy2: number;
  rotate: number;
  rotate2: number;
}

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, NavbarComponent, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  techIcons: TechIcon[] = this.generateIcons();

  trackByIcon(_index: number, icon: TechIcon): number {
    return icon.id;
  }

  private generateIcons(): TechIcon[] {
    // Devicon classes → real language/tool logos
    // Format: 'devicon-{name}-{variant}'
    // Variants: plain, original, wordmark
    const iconData = [
      { iconClass: 'devicon-html5-plain',        color: '#e34f26' },
      { iconClass: 'devicon-css3-plain',          color: '#1572b6' },
      { iconClass: 'devicon-javascript-plain',    color: '#f7df1e' },
      { iconClass: 'devicon-typescript-plain',    color: '#3178c6' },
      { iconClass: 'devicon-angular-plain',       color: '#dd0031' },
      { iconClass: 'devicon-php-plain',           color: '#777bb4' },
      { iconClass: 'devicon-laravel-original',    color: '#ff2d20' },
      { iconClass: 'devicon-mysql-plain',         color: '#4479a1' },
      { iconClass: 'devicon-git-plain',           color: '#f05032' },
      { iconClass: 'devicon-nodejs-plain',        color: '#339933' },
      { iconClass: 'devicon-docker-plain',        color: '#2496ed' },
      { iconClass: 'devicon-npm-original-wordmark', color: '#cb3837' },
      { iconClass: 'devicon-sass-original',       color: '#cc6699' },
      { iconClass: 'devicon-tailwindcss-original', color: '#06b6d4' },
      { iconClass: 'devicon-bootstrap-plain',     color: '#7952b3' },
      { iconClass: 'devicon-github-original',     color: '#8a94a8' },
      { iconClass: 'devicon-vscode-plain',        color: '#007acc' },
      { iconClass: 'devicon-figma-plain',         color: '#f24e1e' },
      { iconClass: 'devicon-postgresql-plain',    color: '#336791' },
      { iconClass: 'devicon-redis-plain',         color: '#dc382d' },
    ];

    return Array.from({ length: 26 }, (_, i) => {
      const data = iconData[i % iconData.length];
      return {
        id: i,
        iconClass: data.iconClass,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${18 + Math.random() * 20}px`,
        color: data.color,
        opacity: 0.06 + Math.random() * 0.1,
        duration: 28 + Math.random() * 40,
        delay: Math.random() * -60,
        // Each icon drifts in a unique random path
        dx: (Math.random() - 0.5) * 250,
        dy: (Math.random() - 0.5) * 250,
        dx2: (Math.random() - 0.5) * 300,
        dy2: (Math.random() - 0.5) * 300,
        rotate: (Math.random() - 0.5) * 60,
        rotate2: (Math.random() - 0.5) * 90,
      };
    });
  }
}
