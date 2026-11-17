import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SEDES, Sede } from '../../data/gym';

@Component({
  selector: 'app-miembro',
  imports: [RouterLink],
  templateUrl: './miembro.html',
})
export class Miembro {
  private sanitizer = inject(DomSanitizer);

  sedes = SEDES;

  sedeMapa = signal<Sede>(SEDES[1]);

  mapa = computed(() => {
    const { lat, lng } = this.sedeMapa();
    const url =
      'https://www.openstreetmap.org/export/embed.html?bbox=' +
      (lng - 0.006) + '%2C' + (lat - 0.004) + '%2C' + (lng + 0.006) + '%2C' + (lat + 0.004) +
      '&layer=mapnik&marker=' + lat + '%2C' + lng;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });
}
