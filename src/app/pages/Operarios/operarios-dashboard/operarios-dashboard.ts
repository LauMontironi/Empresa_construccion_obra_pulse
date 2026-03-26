import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ObraCard } from '../../../component/Shared/obra-card/obra-card';
import { UserCard } from '../../../component/Shared/user-card/user-card';

import { OperariosService } from '../../../services/operarios';
import { Obra } from '../../../interfaces/Iobra';
import { MeResponse } from '../../../interfaces/Ime';

@Component({
  selector: 'app-operarios-dashboard',
  standalone: true,
  imports: [RouterLink, ObraCard, UserCard],
  templateUrl: './operarios-dashboard.html',
  styleUrl: './operarios-dashboard.css',
})
export class OperariosDashboard implements OnInit {
  private operariosService = inject(OperariosService);
  private cdr = inject(ChangeDetectorRef);

  me: MeResponse | null = null;
  obras: Obra[] = [];
  obrasPreview: Obra[] = [];
  loading = true;
  error = '';

  get obrasCompletadas(): number {
    return this.obras.filter((obra) => obra.estado === 'completada').length;
  }

  get obrasEnProgreso(): number {
    return this.obras.filter((obra) => obra.estado === 'en progreso').length;
  }

  get obrasPendientes(): number {
    return this.obras.filter((obra) => obra.estado === 'pendiente').length;
  }

  get totalObras(): number {
    return this.obras.length;
  }

  async ngOnInit() {
    try {
      this.me = await this.operariosService.getMe();
      this.obras = await this.operariosService.getMisObras();
      this.obrasPreview = this.obras.slice(0, 2);
    } catch (error) {
      console.error('Error al cargar datos del operario:', error);
      this.error = 'No se pudieron cargar los datos del panel';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}