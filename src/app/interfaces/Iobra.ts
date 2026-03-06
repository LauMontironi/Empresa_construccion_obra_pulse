export type ObraEstado = 'pendiente' | 'en progreso' | 'completada';

export interface Obra {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  localizacion: string;
  operario_id: number | null;
  estado: ObraEstado;
  foto: string | null;
  created_at?: string;
  fecha_inicio?: string | null;
  updated_at?: string | null;
}