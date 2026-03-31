import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isOpen = signal(false);
  isLoading = signal(false);
  showPassword = signal(false);
  errorMessage = signal('');

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  open(): void {
    this.isOpen.set(true);
    this.errorMessage.set('');
    this.loginForm.reset();
  }

  close(): void {
    this.isOpen.set(false);
    this.errorMessage.set('');
    this.loginForm.reset();
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    // Replace with your actual AuthService call
    // this.authService.login(this.loginForm.value).subscribe(...)
    setTimeout(() => {
      this.isLoading.set(false);

      // Example: check credentials
      const { email, password } = this.loginForm.value;
      if (email === 'admin@portfolio.dev' && password === 'admin123') {
        this.close();
        // Navigate to admin/edit page
        // this.router.navigate(['/admin']);
        console.log('Login successful — redirect to admin panel');
      } else {
        this.errorMessage.set('Invalid email or password. Please try again.');
      }
    }, 1500);
  }

  /** Close modal when clicking the backdrop */
  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }
}
