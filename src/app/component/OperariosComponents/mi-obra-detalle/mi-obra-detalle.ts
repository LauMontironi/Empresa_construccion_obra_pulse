import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { OperariosService } from '../../../services/operarios';
import { Obra } from '../../../interfaces/Iobra';
import { Notificacion } from '../../../interfaces/Inotificacion';
import { FotoObra } from '../../../interfaces/Fotoobra';

@Component({
  selector: 'app-mi-obra-detalle',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './mi-obra-detalle.html',
  styleUrl: './mi-obra-detalle.css',
})
export class MiObraDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private operariosService = inject(OperariosService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  obra: Obra | null = null;
  obraId: number | null = null;

  notificaciones: Notificacion[] = [];
  fotos: FotoObra[] = [];

  loading = true;
  saving = false;
  error = '';
  formError = '';
  formSuccess = '';

  notificationForm = this.fb.group({
    tipo: ['avance', [Validators.required]],
    mensaje: ['', [Validators.required, Validators.minLength(5)]],
  });

  async ngOnInit() {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));

      if (!id) {
        this.error = 'ID de obra inválido';
        return;
      }

      this.obraId = id;

      this.obra = await this.operariosService.getMiObraById(id);
      this.notificaciones = await this.operariosService.getNotificacionesPorObra(id);
      this.fotos = await this.operariosService.getFotosDeObra(id);
    } catch (err) {
      console.error('Error al cargar detalle de obra', err);
      this.error = 'No se pudo cargar la obra';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async onSubmitNotification() {
    this.formError = '';
    this.formSuccess = '';

    if (this.notificationForm.invalid || !this.obraId) {
      this.notificationForm.markAllAsTouched();
      return;
    }

    this.saving = true;

    try {
      const { tipo, mensaje } = this.notificationForm.getRawValue();

      const nueva = await this.operariosService.crearNotificacion({
        obra_id: this.obraId,
        tipo: tipo as 'avance' | 'incidencia' | 'material',
        mensaje: mensaje!,
      });

      this.notificaciones = [nueva, ...this.notificaciones];
      this.notificationForm.reset({
        tipo: 'avance',
        mensaje: '',
      });

      this.formSuccess = 'Actualización registrada correctamente.';
    } catch (err) {
      console.error('Error al crear notificación', err);
      this.formError = 'No se pudo guardar la actualización.';
    } finally {
      this.saving = false;
      this.cdr.detectChanges();
    }
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleString('es-ES', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }
}