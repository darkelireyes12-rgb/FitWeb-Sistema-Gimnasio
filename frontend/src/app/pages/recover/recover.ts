import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { mensajeError } from '../../core/errores';
import { Campo } from '../../components/campo/campo';
import { LogoEsquina } from '../../components/logo-esquina/logo-esquina';

@Component({
  selector: 'app-recover',
  imports: [ReactiveFormsModule, RouterLink, Campo, LogoEsquina],
  templateUrl: './recover.html',
})
export class Recover {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
  });

  error = signal('');

  enviarCodigo() {
    this.error.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.solicitarCodigo(this.form.getRawValue().correo).subscribe({
      // el mensaje viaja a la pantalla siguiente sin mostrarse en la URL
      next: (r) => this.router.navigate(['/recover-result'], { state: { mensaje: r.mensaje } }),
      error: (e) => this.error.set(mensajeError(e)),
    });
  }
}
