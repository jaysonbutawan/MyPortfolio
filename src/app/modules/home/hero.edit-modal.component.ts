import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-hero-edit-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if (isOpen()) {
      <div
        class="modal-backdrop fixed inset-0 z-[200]
               flex items-center justify-center
               bg-[#06080f]/70 backdrop-blur-sm p-4
               animate-[fadeIn_0.2s_ease-out]"
        (click)="onBackdropClick($event)"
      >
        <div
          class="relative w-full max-w-2xl
                 bg-[#0e1221] border border-[rgba(100,140,255,0.08)]
                 rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.6)]
                 overflow-hidden animate-[modalIn_0.3s_ease-out]"
        >
          <!-- Gradient bar -->
          <div class="h-[3px] w-full bg-gradient-to-r from-[#5b8def] via-[#a78bfa] to-[#34d399]"></div>

          <!-- Header -->
          <div class="px-8 pt-7 pb-0 flex justify-between items-start">
            <div>
              <h2 class="text-xl font-bold text-[#e8ecf4] tracking-tight">
                Edit Hero Section
              </h2>
              <p class="text-[#515a6e] text-[0.82rem] mt-1">
                Update your name, role, and introduction
              </p>
            </div>
            <button
              (click)="close()"
              type="button"
              class="w-9 h-9 rounded-xl flex items-center justify-center
                     text-[#515a6e] hover:text-white
                     hover:bg-[rgba(91,141,239,0.08)]
                     transition-all duration-200 cursor-pointer"
            >
              <i class="pi pi-times text-base"></i>
            </button>
          </div>

          <!-- Form -->
          <form
            [formGroup]="heroForm"
            (ngSubmit)="onSave()"
            class="px-8 pt-6 pb-8 space-y-5"
          >
            <div class="grid grid-cols-2 gap-5">
              <!-- First Name -->
              <div class="flex flex-col gap-2">
                <label class="text-[0.68rem] font-bold text-[#515a6e] uppercase tracking-[1.5px] ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  formControlName="name"
                  class="w-full bg-[rgba(14,20,40,0.8)] border border-[rgba(100,140,255,0.08)]
                         rounded-xl py-3.5 px-4 text-[#e8ecf4] text-[0.92rem]
                         placeholder:text-[#3d4455]
                         focus:outline-none focus:border-[#5b8def]
                         focus:shadow-[0_0_0_3px_rgba(91,141,239,0.2)]
                         transition-all duration-300"
                />
              </div>
              <!-- Last Name -->
              <div class="flex flex-col gap-2">
                <label class="text-[0.68rem] font-bold text-[#515a6e] uppercase tracking-[1.5px] ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  formControlName="lastName"
                  class="w-full bg-[rgba(14,20,40,0.8)] border border-[rgba(100,140,255,0.08)]
                         rounded-xl py-3.5 px-4 text-[#e8ecf4] text-[0.92rem]
                         placeholder:text-[#3d4455]
                         focus:outline-none focus:border-[#5b8def]
                         focus:shadow-[0_0_0_3px_rgba(91,141,239,0.2)]
                         transition-all duration-300"
                />
              </div>
            </div>

            <!-- Role -->
            <div class="flex flex-col gap-2">
              <label class="text-[0.68rem] font-bold text-[#515a6e] uppercase tracking-[1.5px] ml-1">
                Role / Title
              </label>
              <input
                type="text"
                formControlName="role"
                class="w-full bg-[rgba(14,20,40,0.8)] border border-[rgba(100,140,255,0.08)]
                       rounded-xl py-3.5 px-4 text-[#e8ecf4] text-[0.92rem]
                       placeholder:text-[#3d4455]
                       focus:outline-none focus:border-[#5b8def]
                       focus:shadow-[0_0_0_3px_rgba(91,141,239,0.2)]
                       transition-all duration-300"
              />
            </div>

            <!-- Status Badge -->
            <div class="flex flex-col gap-2">
              <label class="text-[0.68rem] font-bold text-[#515a6e] uppercase tracking-[1.5px] ml-1">
                Status Badge
              </label>
              <input
                type="text"
                formControlName="statusBadge"
                class="w-full bg-[rgba(14,20,40,0.8)] border border-[rgba(100,140,255,0.08)]
                       rounded-xl py-3.5 px-4 text-[#e8ecf4] text-[0.92rem]
                       placeholder:text-[#3d4455]
                       focus:outline-none focus:border-[#5b8def]
                       focus:shadow-[0_0_0_3px_rgba(91,141,239,0.2)]
                       transition-all duration-300"
              />
            </div>

            <!-- Summary -->
            <div class="flex flex-col gap-2">
              <label class="text-[0.68rem] font-bold text-[#515a6e] uppercase tracking-[1.5px] ml-1">
                Professional Summary
              </label>
              <textarea
                formControlName="summary"
                rows="4"
                class="w-full bg-[rgba(14,20,40,0.8)] border border-[rgba(100,140,255,0.08)]
                       rounded-xl py-3.5 px-4 text-[#e8ecf4] text-[0.92rem]
                       placeholder:text-[#3d4455] resize-none
                       focus:outline-none focus:border-[#5b8def]
                       focus:shadow-[0_0_0_3px_rgba(91,141,239,0.2)]
                       transition-all duration-300"
              ></textarea>
            </div>

            <!-- Actions -->
            <div class="flex justify-end items-center gap-6 pt-2">
              <button
                (click)="close()"
                type="button"
                class="text-[0.75rem] font-bold uppercase tracking-[0.15em]
                       text-[#515a6e] hover:text-red-400
                       transition-colors cursor-pointer"
              >
                Discard
              </button>
              <button
                type="submit"
                [disabled]="heroForm.invalid || isSaving()"
                class="group relative overflow-hidden
                       flex items-center gap-2.5
                       px-8 py-3.5 rounded-2xl
                       text-[0.82rem] font-bold uppercase tracking-[0.1em] text-white
                       bg-gradient-to-r from-[#5b8def] via-[#a78bfa] to-[#34d399]
                       shadow-[0_4px_24px_rgba(91,141,239,0.3)]
                       hover:shadow-[0_8px_32px_rgba(91,141,239,0.45)]
                       active:scale-[0.97]
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-all duration-300 cursor-pointer"
              >
                <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <i
                  class="pi text-sm relative z-10"
                  [ngClass]="{ 'pi-spin pi-spinner': isSaving(), 'pi-check-circle': !isSaving() }"
                ></i>
                <span class="relative z-10">
                  {{ isSaving() ? 'Saving...' : 'Save Changes' }}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: [
    `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes modalIn {
        from { opacity: 0; transform: scale(0.95) translateY(10px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
    `,
  ],
})
export class HeroEditModalComponent {
  isOpen = signal(false);
  isSaving = signal(false);
  heroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService
  ) {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      statusBadge: [''],
      summary: ['', Validators.required],
    });
  }

  open(): void {
    // Pre-fill with current data
    const hero = this.portfolioService.data().hero;
    this.heroForm.patchValue({
      name: hero.name,
      lastName: hero.lastName,
      role: hero.role,
      statusBadge: hero.statusBadge,
      summary: hero.summary,
    });
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  onSave(): void {
    if (this.heroForm.invalid) return;

    this.isSaving.set(true);

    // Simulate save — replace with actual API call
    setTimeout(() => {
      const current = this.portfolioService.data().hero;
      this.portfolioService.updateHero({
        ...current,
        ...this.heroForm.value,
      });
      this.isSaving.set(false);
      this.close();
    }, 800);
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }
}
