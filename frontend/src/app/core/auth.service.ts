import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { Inscripcion, Mensaje, Usuario } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  readonly usuario = signal<Usuario | null>(null);

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(correo: string, contrasena: string): Observable<Usuario> {
    localStorage.removeItem('token');
    return this.http.post<{ token: string }>('/api/auth/login', { correo, contrasena }).pipe(
      tap((r) => localStorage.setItem('token', r.token)),
      switchMap(() => this.http.get<Usuario>('/api/auth/me')),
      tap((u) => this.usuario.set(u)),
    );
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.usuario.set(null);
  }

  obtenerUsuario(): Observable<Usuario | null> {
    if (this.usuario()) {
      return of(this.usuario());
    }
    if (!this.getToken()) {
      return of(null);
    }
    return this.http.get<Usuario>('/api/auth/me').pipe(
      tap((u) => this.usuario.set(u)),
      map((u): Usuario | null => u),
      catchError(() => {
        localStorage.removeItem('token');
        this.usuario.set(null);
        return of(null);
      }),
    );
  }

  cargarUsuario(): void {
    this.obtenerUsuario().subscribe();
  }

  inscribir(datos: Inscripcion): Observable<Usuario> {
    return this.http.post<Usuario>('/api/auth/inscripcion', datos);
  }

  // Recuperar la clave, paso 1: enviar el código al correo
  solicitarCodigo(correo: string): Observable<Mensaje> {
    return this.http.post<Mensaje>('/api/auth/recuperar/solicitar', { correo });
  }

  // Paso 2: comprobar el código
  validarCodigo(token: string): Observable<Mensaje> {
    return this.http.post<Mensaje>('/api/auth/recuperar/validar', { token });
  }

  // Paso 3: guardar la nueva clave
  cambiarClave(token: string, nuevaClave: string): Observable<Mensaje> {
    return this.http.post<Mensaje>('/api/auth/recuperar/cambiar', { token, nuevaClave });
  }
}
