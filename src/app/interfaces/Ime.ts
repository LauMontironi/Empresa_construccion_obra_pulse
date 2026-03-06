export interface MeOperarioData {
  operario_id: number;
  especialidad: string;
  estado: string;
  localizacion: string;
  telefono: string;
}

export interface MeResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  rol: 'admin' | 'operario';
  foto_url: string | null;
  operario: MeOperarioData | null;
}