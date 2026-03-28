import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AboutDetail {
  icon: string;
  label: string;
  value: string;
  gradient: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  details: AboutDetail[] = [
    {
      icon: '📍',
      label: 'Location',
      value: 'Manila, Philippines',
      gradient: 'from-red-500/20 to-red-600/5',
    },
    {
      icon: '💼',
      label: 'Specialization',
      value: 'Full-Stack Web Development',
      gradient: 'from-amber-500/20 to-amber-600/5',
    },
    {
      icon: '🎯',
      label: 'Focus',
      value: 'Angular · Laravel · REST APIs',
      gradient: 'from-rose-500/20 to-rose-600/5',
    },
    {
      icon: '🌐',
      label: 'Languages',
      value: 'English · Filipino',
      gradient: 'from-cyan-500/20 to-cyan-600/5',
    },
  ];
}
