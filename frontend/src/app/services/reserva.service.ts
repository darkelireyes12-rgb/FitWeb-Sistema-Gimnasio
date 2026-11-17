import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../core/models';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private http = inject(HttpClient);

  crear(servicioId: number, fechaHora: string): Observable<Reserva> {
    return this.http.post<Reserva>('/api/reservas', { servicioId, fechaHora });
  }

  // el historial del usuario con sesión
  misReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>('/api/reservas/mias');
  }

  cancelar(id: number): Observable<Reserva> {
    return this.http.put<Reserva>('/api/reservas/' + id + '/cancelar', {});
  }
}
