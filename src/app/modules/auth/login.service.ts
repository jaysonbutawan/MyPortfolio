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
          // Laravel returns { message, token, user }
          // — no "success" field, so check for token directly
          if (response.token) {
            localStorage.setItem('access_token', response.token);
            localStorage.setItem('user_data', JSON.stringify(response.user));
          }
        })
      );
  }

  logout(): Observable<LogoutResponse> {
    const token = localStorage.getItem('access_token');
    // Call backend to revoke the Sanctum token
    return this.http
      .post<LogoutResponse>(
        `${this.API_URL}/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .pipe(
        tap(() => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_data');
        })
      );
  }

  clearLocalSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
