import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ObraCard } from '../../../component/Shared/obra-card/obra-card';
import { UserCard } from '../../../component/Shared/user-card/user-card';

import { OperariosService } from '../../../services/operarios';
import { Obra } from '../../../interfaces/Iobra';

@Component({
  selector: 'app-operarios-dashboard',
  standalone: true,
  imports: [RouterLink, ObraCard, UserCard],
  templateUrl: './operarios-dashboard.html',
  styleUrl: './operarios-dashboard.css',
})
export class OperariosDashboard implements OnInit {
  private operariosService = inject(OperariosService);

  obras: Obra[] = [];
  obrasPreview: Obra[] = [];

  async ngOnInit() {
    try {
      this.obras = await this.operariosService.getMisObras();
      this.obrasPreview = this.obras.slice(0, 2);
    } catch (error) {
      console.error('Error al cargar las obras del operario:', error);
    }
  }
}