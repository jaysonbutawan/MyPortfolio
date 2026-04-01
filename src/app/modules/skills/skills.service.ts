import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // 1. Added Observable for better typing
import { environment } from '../../../environments/environment.development';
import { Skill } from './skills.component'; // Ensure this path is correct

@Injectable({
  providedIn: 'root',
})
export class TechStackService {
  private http = inject(HttpClient);

  // Make sure this matches your Laravel route prefix
  private readonly API_URL = `${environment.apiUrl}/tech-stacks`;

  // 2. Fixed 'this.api' to 'this.API_URL'
  getAll(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.API_URL);
  }

  create(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.API_URL, skill);
  }

  update(id: number, skill: Partial<Skill>): Observable<Skill> {
    return this.http.put<Skill>(`${this.API_URL}/${id}`, skill);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
