import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Obra } from '../../../interfaces/Iobra';

@Component({
  selector: 'app-obra-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './obra-card.html',
  styleUrl: './obra-card.css',
})
export class ObraCard {

  obra = input.required<Obra>();

}