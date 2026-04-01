import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-orb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orb.component.html',
  styleUrls: [`./orb.component.css`],
})
export class HeroOrbComponent {
  @ViewChild('orbContainer') orbContainer!: ElementRef<HTMLElement>;

  isHovered = signal(false);

  // Mouse position relative to orb center (normalized -1 to 1)
  private mouseX = 0;
  private mouseY = 0;

  // Cursor position as percentage for glow spot
  private cursorPctX = 50;
  private cursorPctY = 50;

  onMouseMove(event: MouseEvent): void {
    const rect = this.orbContainer.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalized -1 to 1
    this.mouseX = (event.clientX - centerX) / (rect.width / 2);
    this.mouseY = (event.clientY - centerY) / (rect.height / 2);

    // Clamp values
    this.mouseX = Math.max(-1, Math.min(1, this.mouseX));
    this.mouseY = Math.max(-1, Math.min(1, this.mouseY));

    // Percentage for glow position
    this.cursorPctX = ((event.clientX - rect.left) / rect.width) * 100;
    this.cursorPctY = ((event.clientY - rect.top) / rect.height) * 100;
  }

  onMouseEnter(): void {
    this.isHovered.set(true);
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
    // Smoothly reset to center
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorPctX = 50;
    this.cursorPctY = 50;
  }

  /** 3D tilt transform based on cursor position */
  orbTransform(): string {
    if (!this.isHovered()) {
      return 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
    const tiltX = -this.mouseY * 12;
    const tiltY = this.mouseX * 12;
    const moveX = this.mouseX * 6;
    const moveY = this.mouseY * 6;
    return `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateX(${moveX}px) translateY(${moveY}px) scale(1.03)`;
  }

  /** Radial glow that follows cursor */
  cursorGlow(): string {
    return `radial-gradient(circle at ${this.cursorPctX}% ${this.cursorPctY}%, rgba(91,141,239,0.12) 0%, transparent 60%)`;
  }
}
