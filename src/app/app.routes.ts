import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { OperariosDashboard } from './pages/Operarios/operarios-dashboard/operarios-dashboard';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'operarios', component: OperariosDashboard, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' }
];
