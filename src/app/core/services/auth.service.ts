import { Injectable, signal, computed, inject } from '@angular/core';
import { LoginService } from '../../modules/auth/login.service';
import { UserData } from '../../modules/auth/login.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginService = inject(LoginService);
  private currentUser = signal<UserData | null>(null);

  /** Reactive — use in templates */
  isAdmin = computed(() => this.currentUser() !== null);
  isGuest = computed(() => this.currentUser() === null);
  user = computed(() => this.currentUser());

  constructor() {
    this.restoreSession();
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.loginService.login({ email, password }).subscribe({
        next: (response) => {
          if (response.token?.token && response.token?.user) {
            this.currentUser.set(response.token.user);
            resolve(true);
          } else {
            // No user in response → treat as guest
            this.currentUser.set(null);
            resolve(false);
          }
        },
        error: () => {
          this.currentUser.set(null);
          resolve(false);
        },
      });
    });
  }

  /** Normal logout — calls backend to revoke token */
  logout(): void {
    this.loginService.logout().subscribe({
      next: () => this.currentUser.set(null),
      error: () => this.forceLogout(),
    });
  }

  /** Force logout — used by interceptor on 401, skips backend call */
  forceLogout(): void {
    this.loginService.clearLocalSession();
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  /** Restore session on app load — if token exists but user is
      null/corrupt, fall back to guest silently */
  private restoreSession(): void {
    if (!this.loginService.isLoggedIn()) {
      // No token → guest, nothing to restore
      this.currentUser.set(null);
      return;
    }

    try {
      const stored = localStorage.getItem('user_data');
      if (stored) {
        const parsed = JSON.parse(stored) as UserData;
        // Validate that parsed data has required fields
        if (parsed && parsed.id && parsed.email) {
          this.currentUser.set(parsed);
        } else {
          // Corrupt data → clear and fall back to guest
          this.loginService.clearLocalSession();
          this.currentUser.set(null);
        }
      } else {
        // Token exists but no user data → stale session → guest
        this.loginService.clearLocalSession();
        this.currentUser.set(null);
      }
    } catch {
      this.loginService.clearLocalSession();
      this.currentUser.set(null);
    }
  }
}
