import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { MeResponse } from '../interfaces/Ime';
import { Notificacion } from '../interfaces/Inotificacion';
import { Obra } from '../interfaces/Iobra';

@Injectable({
  providedIn: 'root',
})
export class OperariosService {
  private http = inject(HttpClient);

  private baseUrl = 'https://empresacontruccion-production.up.railway.app';

  getMe() {
    return firstValueFrom(
      this.http.get<MeResponse>(`${this.baseUrl}/me`)
    );
  }

  getNotificacionesOperario() {
    return firstValueFrom(
      this.http.get<Notificacion[]>(`${this.baseUrl}/operarios/notificaciones`)
    );
  }

  getObrasAdmin() {
    return firstValueFrom(
      this.http.get<Obra[]>(`${this.baseUrl}/admin/obras`)
    );
  }
}
