import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavLink {
  label: string;
  fragment: string;
  icon: string;
}

interface SocialLink {
  label: string;
  icon: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  activeSection = signal('hero');

  navLinks: NavLink[] = [
    { label: 'Home', fragment: 'hero', icon: 'pi pi-home' },
    { label: 'About', fragment: 'about', icon: 'pi pi-user' },
    { label: 'Skills', fragment: 'skills', icon: 'pi pi-code' },
    { label: 'Experience', fragment: 'experience', icon: 'pi pi-briefcase' },
    { label: 'Projects', fragment: 'projects', icon: 'pi pi-folder-open' },
    { label: 'Education', fragment: 'education', icon: 'pi pi-graduation-cap' },
    { label: 'Contact', fragment: 'contact', icon: 'pi pi-envelope' },
  ];

  socialLinks: SocialLink[] = [
    { label: 'GitHub', icon: 'pi pi-github', href: 'https://github.com/johndoe' },
    { label: 'LinkedIn', icon: 'pi pi-linkedin', href: 'https://linkedin.com/in/johndoe' },
    { label: 'Email', icon: 'pi pi-envelope', href: 'mailto:john@doe.dev' },
  ];

  navClasses = computed(() => {
    const base =
      'fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out border-b';
    const scrolled = this.isScrolled()
      ? 'bg-[#06080f]/[0.92] shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-[rgba(100,140,255,0.08)]'
      : 'bg-[#06080f]/75 border-[rgba(100,140,255,0.08)]';
    return `${base} ${scrolled} backdrop-blur-[20px] backdrop-saturate-[1.6]`;
  });

  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.setupSectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  private setupSectionObserver(): void {
    const sectionIds = this.navLinks.map((link) => link.fragment);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) this.observer!.observe(el);
      });
    }, 100);
  }

  scrollTo(fragment: string): void {
    this.isMobileMenuOpen.set(false);
    const el = document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  isActive(fragment: string): boolean {
    return this.activeSection() === fragment;
  }
}
