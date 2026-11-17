import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { mensajeError } from '../../core/errores';
import { Campo } from '../../components/campo/campo';
import { LogoEsquina } from '../../components/logo-esquina/logo-esquina';

@Component({
  selector: 'app-recover-result',
  imports: [ReactiveFormsModule, RouterLink, Campo, LogoEsquina],
  templateUrl: './recover-result.html',
})
export class RecoverResult {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    token: ['', Validators.required],
  });

  error = signal('');

  mensaje: string = history.state?.mensaje ?? '';

  validarCodigo() {
    this.error.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const token = this.form.getRawValue().token;
    this.auth.validarCodigo(token).subscribe({
      next: () => this.router.navigate(['/reset'], { state: { token } }),
      error: (e) => this.error.set(mensajeError(e)),
    });
  }
}
