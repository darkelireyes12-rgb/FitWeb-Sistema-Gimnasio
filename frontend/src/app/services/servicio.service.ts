import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../core/models';

@Injectable({ providedIn: 'root' })
export class ServicioService {
  private http = inject(HttpClient);

  listar(buscar = ''): Observable<Servicio[]> {
    return this.http.get<Servicio[]>('/api/servicios', { params: { buscar } });
  }
}
