import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface ContactLinkApiResponse {
  id: number;
  label: string | null;
  value: string | null;
  href: string | null;
  order: number;
}

export interface ContactLinkPayload {
  label?: string;
  value?: string;
  href?: string;
  order?: number;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/contacts`;

  getLinks(): Observable<ContactLinkApiResponse[]> {
    return this.http.get<ContactLinkApiResponse[]>(this.API_URL);
  }

  store(data: ContactLinkPayload): Observable<ContactLinkApiResponse> {
    return this.http.post<ContactLinkApiResponse>(this.API_URL, data);
  }

  update(id: number, data: ContactLinkPayload): Observable<ContactLinkApiResponse> {
    return this.http.put<ContactLinkApiResponse>(`${this.API_URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
