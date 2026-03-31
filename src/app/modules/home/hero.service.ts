import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HeroData } from '../../core/services/portfolio.service';

// Matches Laravel's HeroSection model response
export interface HeroApiResponse {
  id: number;
  name: string;
  role: string;
  summary: string;
  status_badge: string;   
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/hero`;

  /** GET /api/hero — public, no auth needed */
  getHero(): Observable<HeroApiResponse> {
    return this.http.get<HeroApiResponse>(this.API_URL);
  }

  /** PUT /api/hero — auth required (interceptor adds Bearer token) */
  updateHero(data: HeroData): Observable<HeroApiResponse> {
    // Convert Angular camelCase → Laravel snake_case
    const payload = {
      name: data.name,
      role: data.role,
      summary: data.summary,
      status_badge: data.statusBadge,
    };
    return this.http.put<HeroApiResponse>(this.API_URL, payload);
  }
}
