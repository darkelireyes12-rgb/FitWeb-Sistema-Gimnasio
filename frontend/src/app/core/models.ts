// Los datos que envía y recibe el backend (iguales a los DTO de Java)

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string; 
  telefono: string | null;
  peso: number | null;
  talla: number | null;
  planId: number | null;
  plan: string | null;
  sede: string | null;
}

export interface Plan {
  id: number;
  nombre: string;
  mensualidad: number;
  beneficios: string | null; 
}

export interface Servicio {
  id?: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
}

export interface Reserva {
  id: number;
  cliente: string;
  servicioId: number;
  servicio: string;
  fechaHora: string;
  estado: string; 
}

export interface Reporte {
  usuarios: number;
  reservasActivas: number;
  reservasCanceladas: number;
  porServicio: { servicio: string; total: number }[];
}

export interface Inscripcion {
  correo: string;
  contrasena: string;
  telefono: string;
  peso: number;
  talla: number;
  planId: number;
  sede: string;
}

export interface UsuarioAdmin {
  correo: string;
  telefono: string;
  planId: number | null;
}

export interface Mensaje {
  mensaje: string;
}
