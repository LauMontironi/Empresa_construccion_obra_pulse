import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { OperariosService } from '../../../services/operarios';
import { Obra } from '../../../interfaces/Iobra';
import { MeResponse } from '../../../interfaces/Ime';
import { ObraCard } from '../../../component/Shared/obra-card/obra-card';
import { UserCard } from '../../../component/Shared/user-card/user-card';

@Component({
  selector: 'app-mis-obras',
  standalone: true,
  imports: [ObraCard, UserCard],
  templateUrl: './mis-obras.html',
  styleUrl: './mis-obras.css',
})
export class MisObrasComponent implements OnInit {
  private operariosService = inject(OperariosService);
  private cdr = inject(ChangeDetectorRef);

  me: MeResponse | null = null;
  obras: Obra[] = [];
  loading = true;
  error = '';

  async ngOnInit() {
    try {
      this.me = await this.operariosService.getMe();
      this.obras = await this.operariosService.getMisObras();
    } catch (err) {
      console.error('Error al cargar mis obras', err);
      this.error = 'No se pudieron cargar tus datos o tus obras';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}