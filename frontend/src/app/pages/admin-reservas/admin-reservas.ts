import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AdminMenu } from '../../components/admin-menu/admin-menu';
import { Reporte, Reserva } from '../../core/models';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-reservas',
  imports: [DatePipe, AdminMenu],
  templateUrl: './admin-reservas.html',
})
export class AdminReservas {
  private adminService = inject(AdminService);

  reservas = signal<Reserva[]>([]);
  reporte = signal<Reporte | null>(null);

  constructor() {
    this.adminService.reservas().subscribe((lista) => this.reservas.set(lista));
    this.adminService.reporte().subscribe((r) => this.reporte.set(r));
  }
}
