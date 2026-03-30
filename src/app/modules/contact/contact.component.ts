import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  signal,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

interface ContactLink {
  icon: string;
  label: string;
  value: string;
  href: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contactSection') contactSection!: ElementRef;

  private observer: IntersectionObserver | null = null;

  isVisible = signal(false);
  isSending = signal(false);
  isSent = signal(false);

  contactForm: FormGroup;

  contactLinks: ContactLink[] = [
    {
      icon: '✉️',
      label: 'Email',
      value: 'jaysonbutawan2@gmail.com',
      href: 'mailto:jaysonbutawan2@gmail.com',
    },
    {
      icon: '🔗',
      label: 'LinkedIn',
      value: 'linkedin.com/in/jayson-butawan',
      href: 'https://www.linkedin.com/in/jayson-butawan-6015b63a3/',
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'github.com/jaysonbutawan',
      href: 'https://github.com/jaysonbutawan',
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+63 9764001459',
      href: 'tel:+639764001459',
    },
  ];

 constructor(
    private fb: FormBuilder,
    private ngZone: NgZone
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngAfterViewInit(): void {
    // Run observer outside Angular zone for performance
    this.ngZone.runOutsideAngular(() => {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        this.setupObserver();
      }, 200);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupObserver(): void {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything
      this.ngZone.run(() => this.isVisible.set(true));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Run inside Angular zone so change detection picks it up
            this.ngZone.run(() => {
              this.isVisible.set(true);
            });
            // Stop observing once visible — animation only plays once
            this.observer?.disconnect();
          }
        });
      },
      {
        threshold: 0.05,          // Trigger when just 5% is visible
        rootMargin: '0px 0px -40px 0px', // Slight offset from bottom
      }
    );

    const el = this.contactSection?.nativeElement;
    if (el) {
      this.observer.observe(el);
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.isSending.set(true);

    // Replace with your actual HTTP service
    setTimeout(() => {
      this.isSending.set(false);
      this.isSent.set(true);
      this.contactForm.reset();

      setTimeout(() => this.isSent.set(false), 4000);
    }, 1500);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
