import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  imports: [RouterLink],
  templateUrl: './admin-menu.html',
})
export class AdminMenu {
  activa = input.required<string>(); 
  opciones = [
    { id: 'usuarios', ruta: '/admin', texto: 'Usuarios' },
    { id: 'servicios', ruta: '/admin/servicios', texto: 'Servicios' },
    { id: 'reservas', ruta: '/admin/reservas', texto: 'Reservas y reportes' },
  ];
}
