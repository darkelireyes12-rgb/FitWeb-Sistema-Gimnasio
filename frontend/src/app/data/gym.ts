

export interface Sede {
  id: string;
  nombre: string;
  direccion: string;
  lat: number;
  lng: number;
  imagen: string;
}

export const SEDES: Sede[] = [
  {
    id: 'norte',
    nombre: 'FitWeb Norte',
    direccion: 'Av. Universitaria 3642, Los Olivos',
    lat: -11.994784075286939,
    lng: -77.08359866980784,
    imagen: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=500',
  },
  {
    id: 'central',
    nombre: 'FitWeb Central',
    direccion: 'Av. Salaverry 1020, Jesús María',
    lat: -12.075543306378885,
    lng: -77.04235288426283,
    imagen: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500',
  },
  {
    id: 'sur',
    nombre: 'FitWeb Sur',
    direccion: 'Av. Caminos del Inca 2100, Santiago de Surco',
    lat: -12.131430453358595,
    lng: -76.9826246536641,
    imagen: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=500',
  },
]

export const CUOTA_SOCIO = 49; // se paga una sola vez al inscribirse
export const OTROS_PAGOS = 0;
