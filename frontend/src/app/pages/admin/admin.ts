import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminMenu } from '../../components/admin-menu/admin-menu';
import { Campo } from '../../components/campo/campo';
import { mensajeError } from '../../core/errores';
import { Plan, Usuario } from '../../core/models';
import { AdminService } from '../../services/admin.service';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, AdminMenu, Campo],
  templateUrl: './admin.html',
})
export class Admin {
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private planService = inject(PlanService);

  usuarios = signal<Usuario[]>([]);
  planes = signal<Plan[]>([]);
  editando = signal<Usuario | null>(null); 
  mensaje = signal('');
  error = signal('');

  // buscador
  buscar = new FormControl('', { nonNullable: true });
  form = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    planId: this.fb.control<number | null>(null),
  });

  constructor() {
    this.cargarUsuarios();
    this.planService.listar().subscribe((lista) => this.planes.set(lista));
  }
  cargarUsuarios() {
    this.adminService.usuarios(this.buscar.value).subscribe((lista) => this.usuarios.set(lista));
  }

  buscarUsuarios(e: Event) {
    e.preventDefault();
    this.cargarUsuarios();
  }

  editar(u: Usuario) {
    this.error.set('');
    this.mensaje.set('');
    this.editando.set(u);
    this.form.setValue({ correo: u.correo, telefono: u.telefono ?? '', planId: u.planId });
  }

  guardar() {
    const usuario = this.editando();
    this.error.set('');
    if (this.form.invalid || !usuario) {
      this.form.markAllAsTouched();
      return;
    }

    const { correo, telefono, planId } = this.form.getRawValue();
    this.adminService.editarUsuario(usuario.id, { correo, telefono, planId }).subscribe({
      next: () => {
        this.mensaje.set('Usuario actualizado.');
        this.editando.set(null);
        this.cargarUsuarios();
      },
      error: (e) => this.error.set(mensajeError(e)),
    });
  }

  eliminar(u: Usuario) {
    if (!confirm('¿Eliminar a ' + u.nombre + '?')) {
      return;
    }
    this.error.set('');
    this.mensaje.set('');

    this.adminService.eliminarUsuario(u.id).subscribe({
      next: () => {
        this.mensaje.set('Usuario eliminado.');
        this.cargarUsuarios();
      },
      error: (e) => this.error.set(mensajeError(e)),
    });
  }
}
