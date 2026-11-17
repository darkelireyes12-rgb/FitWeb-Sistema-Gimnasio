import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { mensajeError } from '../../core/errores';
import { Reserva, Servicio } from '../../core/models';
import { ReservaService } from '../../services/reserva.service';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-reservas',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe],
  templateUrl: './reservas.html',
})
export class Reservas {
  private fb = inject(FormBuilder);
  private reservaService = inject(ReservaService);
  private servicioService = inject(ServicioService);

  servicios = signal<Servicio[]>([]);
  reservas = signal<Reserva[]>([]);
  mensaje = signal('');
  error = signal('');

  form = this.fb.nonNullable.group({
    servicioId: this.fb.control<number | null>(null, Validators.required),
    fechaHora: ['', Validators.required],
  });

  constructor() {
    this.servicioService.listar().subscribe((lista) => this.servicios.set(lista));
    this.cargarReservas();
  }

  cargarReservas() {
    this.reservaService.misReservas().subscribe((lista) => this.reservas.set(lista));
  }

  reservar() {
    this.error.set('');
    this.mensaje.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Elige un servicio y una fecha.');
      return;
    }

    const { servicioId, fechaHora } = this.form.getRawValue();
    this.reservaService.crear(Number(servicioId), fechaHora).subscribe({
      next: () => {
        this.mensaje.set('Reserva creada.');
        this.form.reset();
        this.cargarReservas();
      },
      error: (e) => this.error.set(mensajeError(e)),
    });
  }

  cancelar(r: Reserva) {
    if (!confirm('¿Cancelar la reserva de ' + r.servicio + '?')) {
      return;
    }
    this.error.set('');
    this.mensaje.set('');

    this.reservaService.cancelar(r.id).subscribe({
      next: () => {
        this.mensaje.set('Reserva cancelada.');
        this.cargarReservas();
      },
      error: (e) => this.error.set(mensajeError(e)),
    });
  }
}
