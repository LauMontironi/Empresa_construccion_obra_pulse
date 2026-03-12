import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { MeResponse } from '../interfaces/Ime';
import { Notificacion } from '../interfaces/Inotificacion';
import { Obra } from '../interfaces/Iobra';
import { FotoObra } from '../interfaces/Fotoobra';



@Injectable({
  providedIn: 'root',
})
export class OperariosService {
  private http = inject(HttpClient);

  private baseUrl = 'https://empresacontruccion-production.up.railway.app';

  //private baseUrl = 'http://localhost:8000';

  getMe() {
    return firstValueFrom(
      this.http.get<MeResponse>(`${this.baseUrl}/me`)
    );
  }

  getMisObras() {
    return firstValueFrom(
      this.http.get<Obra[]>(`${this.baseUrl}/operarios/obras`)
    );
  }

  getMiObraById(obraId: number) {
    return firstValueFrom(
      this.http.get<Obra>(`${this.baseUrl}/operarios/obras/${obraId}`)
    );
  }

  getFotosDeObra(obraId: number) {
    return firstValueFrom(
      this.http.get<FotoObra[]>(`${this.baseUrl}/operarios/obras/${obraId}/fotos`)
    );
  }

  getNotificacionesOperario() {
    return firstValueFrom(
      this.http.get<Notificacion[]>(`${this.baseUrl}/operarios/notificaciones`)
    );
  }
}