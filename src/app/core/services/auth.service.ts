import { Injectable, signal, computed, inject } from '@angular/core';
import { LoginService } from '../../modules/auth/login.service';
import { UserData } from '../../modules/auth/login.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginService = inject(LoginService);
  private currentUser = signal<UserData | null>(null);

  /** Reactive — use in templates: auth.isAdmin() */
  isAdmin = computed(() => this.currentUser() !== null);
  user = computed(() => this.currentUser());

  constructor() {
    this.restoreSession();
  }

  /** Login via LoginService → update reactive state */
  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.loginService.login({ email, password }).subscribe({
        next: (response) => {
          // Laravel returns { message, token, user }
          if (response.token && response.user) {
            this.currentUser.set(response.user);
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error: () => resolve(false),
      });
    });
  }

  /** Logout — revoke token on backend + clear local state */
  logout(): void {
    this.loginService.logout().subscribe({
      next: () => this.currentUser.set(null),
      error: () => {
        // Even if backend call fails, clear local session
        this.loginService.clearLocalSession();
        this.currentUser.set(null);
      },
    });
  }

  /** Non-reactive check (for route guards) */
  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  /** Restore from localStorage on app load */
  private restoreSession(): void {
    try {
      const stored = localStorage.getItem('user_data');
      if (stored && this.loginService.isLoggedIn()) {
        this.currentUser.set(JSON.parse(stored));
      }
    } catch {
      this.loginService.clearLocalSession();
    }
  }
}
