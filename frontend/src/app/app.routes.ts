import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { adminGuard, authGuard } from './core/auth.guard';
import { AdminReservas } from './pages/admin-reservas/admin-reservas';
import { AdminServicios } from './pages/admin-servicios/admin-servicios';
import { Admin } from './pages/admin/admin';
import { Inicio } from './pages/inicio/inicio';
import { Inscripcion } from './pages/inscripcion/inscripcion';
import { Login } from './pages/login/login';
import { Miembro } from './pages/miembro/miembro';
import { Perfil } from './pages/perfil/perfil';
import { Planes } from './pages/planes/planes';
import { RecoverResult } from './pages/recover-result/recover-result';
import { Recover } from './pages/recover/recover';
import { Reservas } from './pages/reservas/reservas';
import { Reset } from './pages/reset/reset';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Inicio },
      { path: 'miembro', component: Miembro },
      { path: 'planes/:sedeId', component: Planes },
      { path: 'inscripcion/:sedeId/:planId', component: Inscripcion },

      { path: 'perfil', component: Perfil, canActivate: [authGuard] },
      { path: 'reservas', component: Reservas, canActivate: [authGuard] },

      { path: 'admin', component: Admin, canActivate: [adminGuard] },
      { path: 'admin/servicios', component: AdminServicios, canActivate: [adminGuard] },
      { path: 'admin/reservas', component: AdminReservas, canActivate: [adminGuard] },
    ],
  },

  { path: 'login', component: Login },
  { path: 'recover', component: Recover },
  { path: 'recover-result', component: RecoverResult },
  { path: 'reset', component: Reset },

  { path: '**', redirectTo: '' },
];
