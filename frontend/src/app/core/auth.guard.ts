import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.obtenerUsuario().pipe(map((usuario) => (usuario ? true : router.createUrlTree(['/login']))));
};

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.obtenerUsuario().pipe(
    map((usuario) => {
      if (!usuario) {
        return router.createUrlTree(['/login']);
      }
      return usuario.rol === 'ADMIN' ? true : router.createUrlTree(['/perfil']);
    }),
  );
};
