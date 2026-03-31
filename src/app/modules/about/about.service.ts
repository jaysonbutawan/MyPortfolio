import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface AboutApiResponse {
  id: number;
  section_label: string;
  heading_main: string;
  heading_highlight: string;
  description_top: string;
  description_bottom: string;
}

export interface AboutData {
  section_label: string;
  heading_main: string;
  heading_highlight: string;
  description_top: string;
  description_bottom: string;
}

export interface AboutDetailsCardApiResponse {
  id: number;
  label: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/about-profile`;
  private readonly CARDS_URL = `${environment.apiUrl}/about-details`;

  getAbout(): Observable<AboutApiResponse> {
    console.log('[AboutService] GET →', this.API_URL);
    return this.http.get<AboutApiResponse>(this.API_URL).pipe(
      tap({
        next: (res) => console.log('[AboutService] GET response:', res),
        error: (err) => console.error('[AboutService] GET failed:', err.status, err.error),
      })
    );
  }

  updateAbout(data: AboutData): Observable<AboutApiResponse> {
    const payload = {
      section_label: data.section_label,
      heading_main: data.heading_main,
      heading_highlight: data.heading_highlight,
      description_top: data.description_top,
      description_bottom: data.description_bottom,
    };
    console.log('[AboutService] PUT →', this.API_URL, 'Payload:', payload);
    return this.http.put<AboutApiResponse>(this.API_URL, payload).pipe(
      tap({
        next: (res) => console.log('[AboutService] PUT response:', res),
        error: (err) => console.error('[AboutService] PUT failed:', err.status, err.error),
      })
    );
  }

 getCards(): Observable<AboutDetailsCardApiResponse[]> {
  console.log('[AboutService] GET cards →', this.CARDS_URL);
  return this.http.get<AboutDetailsCardApiResponse[]>(this.CARDS_URL).pipe(
    tap({
      next: (res) => console.log('[AboutService] GET cards response:', res, '| Count:', res?.length),
      error: (err) => console.error('[AboutService] GET cards failed:', err.status, err.error),
    })
  );
}

updateCard(id: number, data: { label: string; value: string }): Observable<AboutDetailsCardApiResponse> {
  const url = `${this.CARDS_URL}/${id}`;
  console.log('[AboutService] PUT card →', url, 'Payload:', data);
  return this.http.put<AboutDetailsCardApiResponse>(url, data).pipe(
    tap({
      next: (res) => console.log('[AboutService] PUT card response:', res),
      error: (err) => console.error('[AboutService] PUT card failed:', err.status, err.error),
    })
  );
}
}
