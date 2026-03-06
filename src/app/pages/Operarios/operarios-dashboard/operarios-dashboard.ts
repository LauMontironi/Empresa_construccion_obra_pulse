import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ObraCard } from '../../../component/Shared/obra-card/obra-card';
import { UserCard } from '../../../component/Shared/user-card/user-card';

@Component({
  selector: 'app-operarios-dashboard',
  standalone: true,
  imports: [RouterLink, ObraCard, UserCard],
  templateUrl: './operarios-dashboard.html',
  styleUrl: './operarios-dashboard.css',
})
export class OperariosDashboard {}