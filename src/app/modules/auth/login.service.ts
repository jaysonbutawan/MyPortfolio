import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LoginResponse, RegisterResponse, LogoutResponse } from './login.dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/auth`;

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap((response) => {
          console.log('--- Login Response ---', response); // Log the full object

          if (response.token?.token) {
            console.log('✅ Login successful. Token received.');
            localStorage.setItem('access_token', response.token.token);
            localStorage.setItem('user_data', JSON.stringify(response.token.user));
          } else {
            console.warn('⚠️ Login response did not contain a token.');
          }
        })
      );
  }

  logout(): Observable<LogoutResponse> {
    const token = localStorage.getItem('access_token');

    return this.http
      .post<LogoutResponse>(
        `${this.API_URL}/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .pipe(
        tap((response) => {
          console.log('--- Logout Response ---', response);
          console.log('🧹 Clearing local session...');

          localStorage.removeItem('access_token');
          localStorage.removeItem('user_data');

          console.log('✨ Session cleared successfully.');
        })
      );
  }

  clearLocalSession(): void {
    console.log('🛑 Force clearing local storage...');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
  }

  isLoggedIn(): boolean {
    const status = !!localStorage.getItem('access_token');
    // console.log(`🔐 Auth Check: User is ${status ? 'Logged In' : 'Logged Out'}`);
    return status;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
