import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

function calcularImc(peso: number | null | undefined, talla: number | null | undefined) {
  if (!peso || !talla) {
    return null;
  }

  const metros = talla / 100;
  const valor = peso / (metros * metros);

  let categoria = 'Obesidad';
  let color = 'bg-danger';
  if (valor < 18.5) {
    categoria = 'Bajo peso';
    color = 'bg-info text-dark';
  } else if (valor < 25) {
    categoria = 'Peso normal';
    color = 'bg-success';
  } else if (valor < 30) {
    categoria = 'Sobrepeso';
    color = 'bg-warning text-dark';
  }

  return { valor, categoria, color };
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.html',
})
export class Perfil {
  private auth = inject(AuthService);
  private router = inject(Router);

  usuario = this.auth.usuario;

  imc = computed(() => calcularImc(this.usuario()?.peso, this.usuario()?.talla));

  cerrarSesion() {
    this.auth.cerrarSesion();
    this.router.navigate(['/login'], { queryParams: { logout: 1 } });
  }
}
