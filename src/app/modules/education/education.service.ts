import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface EducationApiResponse {
  id: number;
  year: string | null;
  degree: string | null;
  school: string | null;
  note: string | null;
  icon: string | null;
  order: number;
}

export interface EducationPayload {
  year?: string;
  degree?: string;
  school?: string;
  note?: string;
  icon?: string;
  order?: number;
}

@Injectable({ providedIn: 'root' })
export class EducationService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/education`;

  getAll(): Observable<EducationApiResponse[]> {
    return this.http.get<EducationApiResponse[]>(this.API_URL);
  }

  store(data: EducationPayload): Observable<EducationApiResponse> {
    return this.http.post<EducationApiResponse>(this.API_URL, data);
  }

  update(id: number, data: EducationPayload): Observable<EducationApiResponse> {
    return this.http.put<EducationApiResponse>(`${this.API_URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
