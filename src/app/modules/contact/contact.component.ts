import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  signal,
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

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible.set(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.observer.observe(this.contactSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.isSending.set(true);

    // Simulate API call — replace with your actual service
    setTimeout(() => {
      this.isSending.set(false);
      this.isSent.set(true);
      this.contactForm.reset();

      // Reset success state after 4 seconds
      setTimeout(() => this.isSent.set(false), 4000);
    }, 1500);
  }
}
