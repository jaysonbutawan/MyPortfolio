import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface ExperienceApiResponse {
  id: number;
  date: string | null;
  role: string | null;
  company: string | null;
  description: string | null;
  tech: string[] | null;
  order: number;
}

export interface ExperiencePayload {
  date?: string;
  role?: string;
  company?: string;
  description?: string;
  tech?: string[];
  order?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/experiences`;

  getExperiences(): Observable<ExperienceApiResponse[]> {
    console.log('[ExperienceService] GET →', this.API_URL);
    return this.http.get<ExperienceApiResponse[]>(this.API_URL).pipe(
      tap({
        next: (res) => console.log('[ExperienceService] GET response:', res, '| Count:', res?.length),
        error: (err) => console.error('[ExperienceService] GET failed:', err.status, err.error),
      })
    );
  }

  storeExperience(data: ExperiencePayload): Observable<ExperienceApiResponse> {
    console.log('[ExperienceService] POST →', this.API_URL, 'Payload:', data);
    return this.http.post<ExperienceApiResponse>(this.API_URL, data).pipe(
      tap({
        next: (res) => console.log('[ExperienceService] POST response:', res),
        error: (err) => console.error('[ExperienceService] POST failed:', err.status, err.error),
      })
    );
  }

  updateExperience(id: number, data: ExperiencePayload): Observable<ExperienceApiResponse> {
    const url = `${this.API_URL}/${id}`;
    console.log('[ExperienceService] PUT →', url, 'Payload:', data);
    return this.http.put<ExperienceApiResponse>(url, data).pipe(
      tap({
        next: (res) => console.log('[ExperienceService] PUT response:', res),
        error: (err) => console.error('[ExperienceService] PUT failed:', err.status, err.error),
      })
    );
  }
}
