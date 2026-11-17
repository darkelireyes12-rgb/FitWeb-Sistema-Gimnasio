import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-campo',
  imports: [ReactiveFormsModule],
  templateUrl: './campo.html',
})
export class Campo {
  etiqueta = input.required<string>();
  control = input.required<FormControl<any>>();
  tipo = input('text'); 
  clase = input(''); 
  contenedor = input('mb-3'); 
  placeholder = input('');
  min = input('');
  max = input('');
  step = input('');

  mensaje(): string {
    const errores = this.control().errors;
    if (!errores) {
      return '';
    }
    if (errores['required']) {
      return 'Este campo es obligatorio.';
    }
    if (errores['email']) {
      return 'Escribe un correo válido.';
    }
    if (errores['minlength']) {
      return 'Mínimo ' + errores['minlength'].requiredLength + ' caracteres.';
    }
    return 'Valor fuera del rango permitido.';
  }
}
