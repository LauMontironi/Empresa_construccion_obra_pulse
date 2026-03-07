import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { OperariosDashboard } from './pages/Operarios/operarios-dashboard/operarios-dashboard';
import { authGuard } from './Guards/auth.guard';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'operarios', component: OperariosDashboard, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  //{ path: 'operarios/mis-obras', component: obra },
  { path: '**', redirectTo: 'home' }
];
