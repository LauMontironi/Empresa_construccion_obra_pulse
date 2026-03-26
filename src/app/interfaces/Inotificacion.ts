export type NotificacionTipo = 'incidencia' | 'avance' | 'material';

export interface Notificacion {
  id: number;
  user_id: number;
  obra_id: number;
  tipo: NotificacionTipo;
  mensaje: string;
  is_read: boolean;
  created_at: string;
}

export interface CrearNotificacionPayload {
  obra_id: number;
  tipo: NotificacionTipo;
  mensaje: string;
}