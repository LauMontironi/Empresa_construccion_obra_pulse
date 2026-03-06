export type OperarioEstado = 'disponible' | 'ocupado';

export interface Operario {
  id: number;
  user_id: number;
  especialidad: string;
  estado: OperarioEstado;
  localizacion: string | null;
  telefono: string | null;
}