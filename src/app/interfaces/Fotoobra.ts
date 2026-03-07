export interface FotoObra {
  id: number;
  obra_id: number;
  url: string;
  descripcion: string | null;
  subido_por_user_id: number;
  created_at: string;
}