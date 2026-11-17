import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { mensajeError } from '../../core/errores';
import { Plan } from '../../core/models';
import { Campo } from '../../components/campo/campo';
import { CUOTA_SOCIO, OTROS_PAGOS, SEDES } from '../../data/gym';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-inscripcion',
  imports: [ReactiveFormsModule, RouterLink, DecimalPipe, Campo],
  templateUrl: './inscripcion.html',
})
export class Inscripcion {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private planService = inject(PlanService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  cuotaSocio = CUOTA_SOCIO;
  otrosPagos = OTROS_PAGOS;

  sede = SEDES.find((s) => s.id === this.route.snapshot.paramMap.get('sedeId'));
  plan = signal<Plan | null>(null);

  total = computed(() => (this.plan()?.mensualidad ?? 0) + CUOTA_SOCIO + OTROS_PAGOS);

  error = signal('');
  enviando = signal(false);

  form = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
    talla: this.fb.control<number | null>(null, [Validators.required, Validators.min(50), Validators.max(250)]),
    peso: this.fb.control<number | null>(null, [Validators.required, Validators.min(1), Validators.max(999)]),
    telefono: ['', Validators.required],
  });

  constructor() {
    if (!this.sede) {
      this.router.navigate(['/miembro'], { replaceUrl: true });
      return;
    }

    const planId = this.route.snapshot.paramMap.get('planId');
    this.planService.listar().subscribe({
      next: (lista) => {
        const elegido = lista.find((p) => String(p.id) === planId);
        if (elegido) {
          this.plan.set(elegido);
        } else {
          this.router.navigate(['/miembro'], { replaceUrl: true });
        }
      },
      error: (e) => this.error.set(mensajeError(e)),
    });
  }

  inscribir() {
    const plan = this.plan();
    this.error.set('');
    if (this.form.invalid || !plan || !this.sede) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    this.enviando.set(true);
    this.auth
      .inscribir({
        correo: v.correo,
        contrasena: v.contrasena,
        telefono: v.telefono,
        peso: Number(v.peso),
        talla: Number(v.talla),
        planId: plan.id,
        sede: this.sede.nombre,
      })
      .subscribe({
        next: () => this.router.navigate(['/login'], { queryParams: { exito: 'inscripcion' } }),
        error: (e) => {
          this.error.set(mensajeError(e));
          this.enviando.set(false);
        },
      });
  }
}
