import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OperariosService } from '../../../services/operarios';
import { Obra } from '../../../interfaces/Iobra';

@Component({
  selector: 'app-mi-obra-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mi-obra-detalle.html',
  styleUrl: './mi-obra-detalle.css',
})
export class MiObraDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private operariosService = inject(OperariosService);
  private cdr = inject(ChangeDetectorRef);

  obra: Obra | null = null;
  loading = true;
  error = '';

  async ngOnInit() {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));

      if (!id) {
        this.error = 'ID de obra inválido';
        return;
      }

      this.obra = await this.operariosService.getMiObraById(id);
    } catch (err) {
      console.error('Error al cargar detalle de obra', err);
      this.error = 'No se pudo cargar la obra';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}