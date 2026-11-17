import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensaje, Reporte, Reserva, Servicio, Usuario, UsuarioAdmin } from '../core/models';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);

  usuarios(buscar = ''): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('/api/admin/usuarios', { params: { buscar } });
  }

  editarUsuario(id: number, datos: UsuarioAdmin): Observable<Usuario> {
    return this.http.put<Usuario>('/api/admin/usuarios/' + id, datos);
  }

  eliminarUsuario(id: number): Observable<Mensaje> {
    return this.http.delete<Mensaje>('/api/admin/usuarios/' + id);
  }

  // ---- Servicios ----
  crearServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>('/api/admin/servicios', servicio);
  }

  editarServicio(id: number, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>('/api/admin/servicios/' + id, servicio);
  }

  eliminarServicio(id: number): Observable<Mensaje> {
    return this.http.delete<Mensaje>('/api/admin/servicios/' + id);
  }

  // ---- Reservas y reporte ----
  reservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>('/api/admin/reservas');
  }

  reporte(): Observable<Reporte> {
    return this.http.get<Reporte>('/api/admin/reportes');
  }
}
