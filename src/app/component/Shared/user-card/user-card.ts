import { Component, input } from '@angular/core';
import { MeResponse } from '../../../interfaces/Ime';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input<MeResponse | null>(null);
}