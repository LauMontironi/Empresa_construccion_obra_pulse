import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Operario } from '../interfaces/Ioperario';

export type ActualizarOperario = Partial<Omit<Operario, 'id' | 'user_id'>>;

@Injectable({
  providedIn: 'root',
})
export class OperariosAdminService {
  private http = inject(HttpClient);
  private baseUrl = 'https://empresacontruccion-production.up.railway.app';

  getOperarios(): Promise<Operario[]> {
    return firstValueFrom(
      this.http.get<Operario[]>(`${this.baseUrl}/admin/operarios`)
    );
  }

  getOperarioById(id: number): Promise<Operario> {
    return firstValueFrom(
      this.http.get<Operario>(`${this.baseUrl}/admin/operarios/${id}`)
    );
  }

  actualizarOperario(id: number, data: ActualizarOperario): Promise<Operario> {
    return firstValueFrom(
      this.http.put<Operario>(`${this.baseUrl}/admin/operarios/${id}`, data)
    );
  }

  eliminarOperario(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.baseUrl}/admin/operarios/${id}`)
    );
  }
}