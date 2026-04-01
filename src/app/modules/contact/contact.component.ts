import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  signal,
  NgZone,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InlineEditComponent } from '../../shared/components/inline-edit/inline-edit.component';
import { ContactService, ContactLinkApiResponse } from './contact.service';
import { AuthService } from '../../core/services/auth.service';

interface ContactLink {
  id: number;
  label: string;
  value: string;
  href: string;
  order: number;
  accentColor: string;
}

const ACCENT_COLORS = [
  'linear-gradient(to bottom, #5b8def, #7aaeff)',
  'linear-gradient(to bottom, #378add, #5b8def)',
  'linear-gradient(to bottom, #a78bfa, #7c6fcd)',
  'linear-gradient(to bottom, #34d399, #1d9e75)',
  'linear-gradient(to bottom, #f59e0b, #d97706)',
  'linear-gradient(to bottom, #f87171, #ef4444)',
];

function mapApiToLink(res: ContactLinkApiResponse, index: number): ContactLink {
  return {
    id: res.id,
    label: res.label ?? '',
    value: res.value ?? '',
    href: res.href ?? '',
    order: res.order,
    accentColor: ACCENT_COLORS[index % ACCENT_COLORS.length],
  };
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InlineEditComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('contactSection') contactSection!: ElementRef;

  private contactService = inject(ContactService);
  auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private ngZone = inject(NgZone);

  private observer: IntersectionObserver | null = null;

  isVisible = signal(false);
  isSending = signal(false);
  isSent = signal(false);

  contactLinks = signal<ContactLink[]>([]);
  isAdding = signal(false);
  deletingId = signal<number | null>(null);

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    this.contactService.getLinks().subscribe({
      next: (res) => this.contactLinks.set(res.map((l, i) => mapApiToLink(l, i))),
      error: (err) => console.error('Failed to load contact links:', err),
    });
  }

  updateLink(id: number, field: 'label' | 'value' | 'href', value: string): void {
    this.contactLinks.update((list) =>
      list.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );

    this.contactService.update(id, { [field]: value }).subscribe({
      next: (res) => {
        this.contactLinks.update((list) =>
          list.map((l) => (l.id === res.id ? { ...mapApiToLink(res, list.findIndex((x) => x.id === res.id)), accentColor: l.accentColor } : l))
        );
      },
      error: (err) => console.error('Failed to save contact link:', err),
    });
  }

  addLink(): void {
    if (this.isAdding()) return;
    this.isAdding.set(true);

    const order = this.contactLinks().length + 1;
    this.contactService.store({ order }).subscribe({
      next: (res) => {
        this.contactLinks.update((list) => [...list, mapApiToLink(res, list.length)]);
        this.isAdding.set(false);
      },
      error: (err) => {
        console.error('Failed to create contact link:', err);
        this.isAdding.set(false);
      },
    });
  }

  deleteLink(id: number): void {
    if (this.deletingId() !== null) return;
    this.deletingId.set(id);

    this.contactService.delete(id).subscribe({
      next: () => {
        this.contactLinks.update((list) => list.filter((l) => l.id !== id));
        this.deletingId.set(null);
      },
      error: (err) => {
        console.error('Failed to delete contact link:', err);
        this.deletingId.set(null);
      },
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;
    this.isSending.set(true);

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

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => this.setupObserver(), 200);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupObserver(): void {
    if (!('IntersectionObserver' in window)) {
      this.ngZone.run(() => this.isVisible.set(true));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.ngZone.run(() => this.isVisible.set(true));
            this.observer?.disconnect();
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    const el = this.contactSection?.nativeElement;
    if (el) this.observer.observe(el);
  }
}
