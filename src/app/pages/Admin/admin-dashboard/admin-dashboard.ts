import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Obra } from '../../../interfaces/Iobra';
import { Operario } from '../../../interfaces/Ioperario';
import { MeResponse } from '../../../interfaces/Ime';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ObrasService } from '../../../services/obras.services';
import { OperariosAdminService } from '../../../services/operarios-admin.services';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboard implements OnInit {
  private obrasService          = inject(ObrasService);
  private operariosAdminService = inject(OperariosAdminService);
  private http                  = inject(HttpClient);

  private baseUrl = 'https://empresacontruccion-production.up.railway.app';

  me                   = signal<MeResponse | null>(null);
  obrasPreview         = signal<Obra[]>([]);
  operariosPreview     = signal<Operario[]>([]);
  totalObras           = signal(0);
  obrasCompletadas     = signal(0);
  obrasEnProgreso      = signal(0);
  totalOperarios       = signal(0);
  operariosDisponibles = signal(0);
  cargando             = signal(true);
  error                = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    try {
      const [me, obras, operarios] = await Promise.all([
        firstValueFrom(this.http.get<MeResponse>(`${this.baseUrl}/me`)),
        this.obrasService.getObras(),
        this.operariosAdminService.getOperarios(),
      ]);

      this.me.set(me);

      this.obrasPreview.set(obras.slice(0, 4));
      this.totalObras.set(obras.length);
      this.obrasCompletadas.set(obras.filter(o => o.estado === 'completada').length);
      this.obrasEnProgreso.set(obras.filter(o => o.estado === 'en progreso').length);

      this.operariosPreview.set(operarios.slice(0, 4));
      this.totalOperarios.set(operarios.length);
      this.operariosDisponibles.set(operarios.filter(o => o.estado === 'disponible').length);

    } catch {
      this.error.set('Error al cargar los datos. Inténtalo de nuevo.');
    } finally {
      this.cargando.set(false);
    }
  }
}