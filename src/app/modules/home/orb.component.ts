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
  template: `
    <!-- Orb Container -->
    <div
      class="relative flex items-center justify-center order-first lg:order-last"
      #orbContainer
      (mousemove)="onMouseMove($event)"
      (mouseleave)="onMouseLeave()"
      (mouseenter)="onMouseEnter()"
    >
      <!-- Ambient glow behind orb — intensifies on hover -->
      <div
        class="absolute w-[320px] h-80 sm:w-100sm:h-100lg:w-115 lg:h-115
               rounded-full pointer-events-none transition-opacity duration-700"
        [style.opacity]="isHovered() ? 0.6 : 0.25"
        [style.background]="'radial-gradient(circle, rgba(91,141,239,0.15) 0%, rgba(167,139,250,0.08) 40%, transparent 70%)'"
        [style.filter]="'blur(' + (isHovered() ? '60px' : '40px') + ')'"
      ></div>

      <!-- Main orb wrapper — handles tilt transform -->
      <div
        class="relative w-75h-75 sm:w-95 sm:h-95 lg:w-105 lg:h-105
               rounded-full transition-transform duration-200 ease-out"
        [style.transform]="orbTransform()"
        #orbMain
      >
        <!-- Outer shell -->
        <div
          class="absolute inset-0 rounded-full
                 bg-[radial-gradient(circle_at_35%_35%,rgba(91,141,239,0.15),rgba(167,139,250,0.08),transparent_70%)]
                 border border-[rgba(91,141,239,0.1)]
                 animate-[orbFloat_8s_ease-in-out_infinite]
                 transition-all duration-500"
          [style.borderColor]="isHovered() ? 'rgba(91,141,239,0.25)' : 'rgba(91,141,239,0.1)'"
          [style.boxShadow]="isHovered()
            ? '0 0 60px rgba(91,141,239,0.2), 0 0 120px rgba(167,139,250,0.1), inset 0 0 40px rgba(91,141,239,0.08)'
            : '0 0 30px rgba(91,141,239,0.05), inset 0 0 20px rgba(91,141,239,0.03)'"
        >
          <!-- Spinning conic ring -->
          <div
            class="absolute inset-px rounded-full
                   bg-[conic-gradient(from_0deg,transparent,#5b8def,transparent,#a78bfa,transparent)]
                   animate-[orbSpin_12s_linear_infinite]
                   transition-opacity duration-500"
            [style.opacity]="isHovered() ? 0.2 : 0.12"
          ></div>

          <!-- Orbiting dot 1 -->
          <div class="absolute inset-0 animate-[orbSpin_8s_linear_infinite]">
            <div
              class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-3 h-3 rounded-full bg-[#5b8def]
                     transition-shadow duration-500"
              [style.boxShadow]="isHovered()
                ? '0 0 24px #5b8def, 0 0 48px rgba(91,141,239,0.5)'
                : '0 0 16px #5b8def, 0 0 32px rgba(91,141,239,0.4)'"
            ></div>
          </div>

          <!-- Orbiting dot 2 -->
          <div class="absolute inset-0 animate-[orbSpin_14s_linear_infinite_reverse]">
            <div
              class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
                     w-2 h-2 rounded-full bg-[#a78bfa]
                     transition-shadow duration-500"
              [style.boxShadow]="isHovered()
                ? '0 0 20px #a78bfa, 0 0 40px rgba(167,139,250,0.4)'
                : '0 0 12px #a78bfa, 0 0 24px rgba(167,139,250,0.3)'"
            ></div>
          </div>

          <!-- Ripple rings — expand outward on hover -->
          <div
            class="absolute -inset-4 rounded-full border
                   transition-all duration-700 ease-out pointer-events-none"
            [style.borderColor]="isHovered() ? 'rgba(91,141,239,0.12)' : 'rgba(91,141,239,0)'"
            [style.transform]="isHovered() ? 'scale(1.08)' : 'scale(1)'"
            [style.opacity]="isHovered() ? 1 : 0"
          ></div>
          <div
            class="absolute -inset-8 rounded-full border
                   transition-all duration-1000 ease-out pointer-events-none"
            [style.borderColor]="isHovered() ? 'rgba(91,141,239,0.06)' : 'rgba(91,141,239,0)'"
            [style.transform]="isHovered() ? 'scale(1.12)' : 'scale(1)'"
            [style.opacity]="isHovered() ? 1 : 0"
          ></div>

          <!-- Dynamic light spot — follows cursor position -->
          <div
            class="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
            [style.opacity]="isHovered() ? 1 : 0"
            [style.background]="cursorGlow()"
          ></div>

          <!-- Inner orb with profile image -->
          <div
            class="absolute inset-7 sm:inset-9 rounded-full
                   bg-[radial-gradient(circle,#0c1120_0%,#06080f_100%)]
                   border border-[rgba(100,140,255,0.06)]
                   flex items-center justify-center z-20
                   overflow-hidden group cursor-pointer
                   transition-all duration-500"
            [style.borderColor]="isHovered() ? 'rgba(100,140,255,0.15)' : 'rgba(100,140,255,0.06)'"
          >
            <!-- Profile Image -->
            <img
              src="assets/me.jpg"
              alt="Jayson Butawan"
              class="w-full h-full object-cover rounded-full
                     transition-transform duration-700 ease-out"
              [style.transform]="'scale(' + (isHovered() ? '1.1' : '1.05') + ')'"
            />

            <!-- Gradient overlay -->
            <div
              class="absolute inset-0 rounded-full
                     bg-linear-to-t from-[#06080f] via-[#06080f]/30 to-transparent
                     transition-opacity duration-500"
              [style.opacity]="isHovered() ? 0.3 : 0.6"
            ></div>

            <!-- Light sweep -->
            <div class="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div
                class="absolute -inset-full
                       bg-linear-to-r from-transparent via-white/4 to-transparent
                       animate-[sweep_4s_ease-in-out_infinite]"
              ></div>
            </div>

            <!-- Inner glow ring -->
            <div
              class="absolute inset-1 rounded-full
                     animate-[glowPulse_3s_ease-in-out_infinite]
                     transition-all duration-500"
              [style.borderWidth]="'1px'"
              [style.borderStyle]="'solid'"
              [style.borderColor]="isHovered() ? 'rgba(100,160,255,0.3)' : 'rgba(100,160,255,0.1)'"
              [style.boxShadow]="isHovered()
                ? 'inset 0 0 35px rgba(91,141,239,0.35)'
                : 'inset 0 0 20px rgba(91,141,239,0.15)'"
            ></div>

            <!-- Name label — slides up on hover -->
            <div
              class="absolute bottom-4 left-0 right-0
                     flex flex-col items-center gap-0.5 z-30
                     transition-all duration-500 ease-out"
              [style.transform]="isHovered() ? 'translateY(0)' : 'translateY(32px)'"
              [style.opacity]="isHovered() ? 1 : 0"
            >
              <span class="text-[0.82rem] font-semibold text-white tracking-wide">
                Jayson Butawan
              </span>
              <span class="text-[0.6rem] font-['JetBrains_Mono',monospace] text-[#5b8def] uppercase tracking-[2px]">
                Full-Stack Dev
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes orbFloat {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
        }
        33% {
          transform: translateY(-12px) rotate(1.5deg);
        }
        66% {
          transform: translateY(8px) rotate(-1deg);
        }
      }

      @keyframes orbSpin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes sweep {
        0% {
          transform: translateX(-100%) rotate(15deg);
        }
        100% {
          transform: translateX(100%) rotate(15deg);
        }
      }

      @keyframes glowPulse {
        0%,
        100% {
          opacity: 0.6;
        }
        50% {
          opacity: 1;
        }
      }
    `,
  ],
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
