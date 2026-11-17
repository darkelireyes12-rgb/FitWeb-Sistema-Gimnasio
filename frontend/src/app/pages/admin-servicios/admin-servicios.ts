import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminMenu } from '../../components/admin-menu/admin-menu';
import { Campo } from '../../components/campo/campo';
import { mensajeError } from '../../core/errores';
import { Servicio } from '../../core/models';
import { AdminService } from '../../services/admin.service';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-admin-servicios',
  imports: [ReactiveFormsModule, DecimalPipe, AdminMenu, Campo],
  templateUrl: './admin-servicios.html',
})
export class AdminServicios {
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private servicioService = inject(ServicioService);

  servicios = signal<Servicio[]>([]);
  formAbierto = signal(false);
  editandoId = signal<number | null>(null); 
  mensaje = signal('');
  error = signal('');

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    precio: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
  });

  constructor() {
    this.cargarServicios();
  }

  cargarServicios() {
    this.servicioService.listar().subscribe((lista) => this.servicios.set(lista));
  }

  abrir(s: Servicio | null) {
    this.error.set('');
    this.mensaje.set('');
    this.editandoId.set(s ? (s.id ?? null) : null);
    this.form.reset({
      nombre: s?.nombre ?? '',
      descripcion: s?.descripcion ?? '',
      precio: s?.precio ?? null,
    });
    this.formAbierto.set(true);
  }

  guardar() {
    this.error.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const datos: Servicio = { nombre: v.nombre, descripcion: v.descripcion, precio: Number(v.precio) };
    const id = this.editandoId();

    const peticion = id ? this.adminService.editarServicio(id, datos) : this.adminService.crearServicio(datos);
    peticion.subscribe({
      next: () => {
        this.mensaje.set(id ? 'Servicio actualizado.' : 'Servicio creado.');
        this.formAbierto.set(false);
        this.cargarServicios();
      },
      error: (e) => this.error.set(mensajeError(e)),
    });
  }

  eliminar(s: Servicio) {
    if (!confirm('¿Eliminar el servicio ' + s.nombre + '?') || !s.id) {
      return;
    }
    this.error.set('');
    this.mensaje.set('');

    this.adminService.eliminarServicio(s.id).subscribe({
      next: () => {
        this.mensaje.set('Servicio eliminado.');
        this.cargarServicios();
      },
      error: (e) => this.error.set(mensajeError(e)),
    });
  }
}
