import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Plan } from '../../core/models';
import { SEDES } from '../../data/gym';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-planes',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './planes.html',
})
export class Planes {
  private planService = inject(PlanService);
  private router = inject(Router);

  planes = signal<Plan[]>([]);

  sede = SEDES.find((s) => s.id === inject(ActivatedRoute).snapshot.paramMap.get('sedeId'));

  constructor() {
    if (!this.sede) {
      this.router.navigate(['/miembro'], { replaceUrl: true });
      return;
    }
    this.planService.listar().subscribe((lista) => this.planes.set(lista));
  }

  beneficios(plan: Plan): string[] {
    return (plan.beneficios ?? '').split(';');
  }
}
