import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface ProjectApiResponse {
  id: number;
  icon: string | null;          // stores base64 image string OR emoji/text
  type: string | null;
  title: string | null;
  description: string | null;
  stack: string[] | null;
  link: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectPayload {
  icon?: string;                // base64 string e.g. "data:image/png;base64,..."
  type?: string;
  title?: string;
  description?: string;
  stack?: string[];
  link?: string;
  order?: number;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/projects`;

  getAll(): Observable<ProjectApiResponse[]> {
    return this.http.get<ProjectApiResponse[]>(this.API_URL);
  }

  store(data: ProjectPayload): Observable<ProjectApiResponse> {
    return this.http.post<ProjectApiResponse>(this.API_URL, data);
  }

  update(id: number, data: ProjectPayload): Observable<ProjectApiResponse> {
    return this.http.put<ProjectApiResponse>(`${this.API_URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
