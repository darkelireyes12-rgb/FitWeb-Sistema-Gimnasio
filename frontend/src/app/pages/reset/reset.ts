import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { mensajeError } from '../../core/errores';
import { Campo } from '../../components/campo/campo';
import { LogoEsquina } from '../../components/logo-esquina/logo-esquina';

@Component({
  selector: 'app-reset',
  imports: [ReactiveFormsModule, Campo, LogoEsquina],
  templateUrl: './reset.html',
})
export class Reset {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    nuevaClave: ['', [Validators.required, Validators.minLength(6)]],
  });

  error = signal('');

  private token: string | null = history.state?.token ?? null;

  constructor() {
    if (!this.token) {
      this.router.navigate(['/recover'], { replaceUrl: true });
    }
  }

  cambiarClave() {
    this.error.set('');
    if (this.form.invalid || !this.token) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.cambiarClave(this.token, this.form.getRawValue().nuevaClave).subscribe({
      next: () => this.router.navigate(['/login'], { queryParams: { exito: 'claveCambiada' } }),
      error: (e) => this.error.set(mensajeError(e)),
    });
  }
}
