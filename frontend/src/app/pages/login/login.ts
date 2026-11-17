import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { mensajeError } from '../../core/errores';
import { Campo } from '../../components/campo/campo';
import { LogoEsquina } from '../../components/logo-esquina/logo-esquina';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Campo, LogoEsquina],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', Validators.required],
  });

  error = signal('');

  exito = this.route.snapshot.queryParamMap.get('exito');
  logout = this.route.snapshot.queryParamMap.has('logout');

  iniciarSesion() {
    this.error.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { correo, contrasena } = this.form.getRawValue();
    this.auth.login(correo, contrasena).subscribe({
      next: (usuario) => this.router.navigate([usuario.rol === 'ADMIN' ? '/admin' : '/perfil']),
      error: (e) => this.error.set(mensajeError(e)),
    });
  }
}
