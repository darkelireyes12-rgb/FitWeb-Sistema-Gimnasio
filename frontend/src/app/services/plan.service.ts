import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../core/models';

@Injectable({ providedIn: 'root' })
export class PlanService {
  private http = inject(HttpClient);

  listar(): Observable<Plan[]> {
    return this.http.get<Plan[]>('/api/planes');
  }
}
