import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TechIcon {
  id: number;
  name: string;
  top: string;
  left: string;
  size: string;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  techIcons: TechIcon[] = this.generateIcons();

  trackByIcon(_index: number, icon: TechIcon): number {
    return icon.id;
  }

  private generateIcons(): TechIcon[] {
    const iconData = [
      { name: '<HTML/>', color: '#e34f26' },
      { name: '{CSS}', color: '#1572b6' },
      { name: 'JS', color: '#f7df1e' },
      { name: 'TS', color: '#3178c6' },
      { name: 'Ng', color: '#dd0031' },
      { name: 'PHP', color: '#777bb4' },
      { name: 'Laravel', color: '#ff2d20' },
      { name: 'MySQL', color: '#4479a1' },
      { name: 'Git', color: '#f05032' },
      { name: 'API', color: '#34d399' },
      { name: 'REST', color: '#a78bfa' },
      { name: 'npm', color: '#cb3837' },
      { name: 'Docker', color: '#2496ed' },
      { name: 'Node', color: '#339933' },
      { name: 'RxJS', color: '#b7178c' },
      { name: '{}', color: '#5b8def' },
      { name: '</>', color: '#8a94a8' },
      { name: 'SQL', color: '#ff9900' },
      { name: 'SCSS', color: '#cc6699' },
      { name: 'JWT', color: '#fb015b' },
    ];

    return Array.from({ length: 22 }, (_, i) => {
      const data = iconData[i % iconData.length];
      return {
        id: i,
        name: data.name,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${10 + Math.random() * 14}px`,
        color: data.color,
        opacity: 0.04 + Math.random() * 0.08,
        duration: 30 + Math.random() * 35,
        delay: Math.random() * -50,
      };
    });
  }
}
