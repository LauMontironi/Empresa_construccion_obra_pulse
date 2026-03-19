import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Obra } from '../interfaces/Iobra';

export type CrearObra = Omit<Obra, 'id' | 'created_at' | 'updated_at' | 'fecha_inicio'>;
export type ActualizarObra = Partial<CrearObra>;

@Injectable({
  providedIn: 'root',
})
export class ObrasService {
  private http = inject(HttpClient);
  private baseUrl = 'https://empresacontruccion-production.up.railway.app';

  getObras(): Promise<Obra[]> {
    return firstValueFrom(
      this.http.get<Obra[]>(`${this.baseUrl}/admin/obras`)
    );
  }

  getObraById(id: number): Promise<Obra> {
    return firstValueFrom(
      this.http.get<Obra>(`${this.baseUrl}/admin/obras/${id}`)
    );
  }

  crearObra(obra: CrearObra): Promise<Obra> {
    return firstValueFrom(
      this.http.post<Obra>(`${this.baseUrl}/admin/obras`, obra)
    );
  }

  actualizarObra(id: number, obra: ActualizarObra): Promise<Obra> {
    return firstValueFrom(
      this.http.put<Obra>(`${this.baseUrl}/admin/obras/${id}`, obra)
    );
  }

  eliminarObra(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.baseUrl}/admin/obras/${id}`)
    );
  }

  asignarOperario(obraId: number, operarioId: number): Promise<unknown> {
    return firstValueFrom(
      this.http.patch(`${this.baseUrl}/admin/obras/${obraId}/asignar`, {
        operario_id: operarioId,
      })
    );
  }
}