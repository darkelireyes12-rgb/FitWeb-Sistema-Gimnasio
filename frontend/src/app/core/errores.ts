import { HttpErrorResponse } from '@angular/common/http';

export function mensajeError(e: unknown): string {
  const error = e as HttpErrorResponse;

  if (error.status === 0) {
    return 'No se pudo conectar con el servidor.';
  }
  if (error.error && error.error.error) {
    return error.error.error;
  }
  if (error.status === 401) {
    return 'Tu sesión venció. Inicia sesión de nuevo.';
  }
  if (error.status === 403) {
    return 'No tienes permiso para hacer esto.';
  }
  return 'Ocurrió un error. Inténtalo de nuevo.';
}
