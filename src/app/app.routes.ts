import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { OperariosDashboard } from './pages/Operarios/operarios-dashboard/operarios-dashboard';
import { authGuard } from './Guards/auth.guard';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { MisObrasComponent } from './pages/Operarios/mis-obras/mis-obras';
import { MiObraDetalleComponent } from './component/OperariosComponents/mi-obra-detalle/mi-obra-detalle';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'operarios', component: OperariosDashboard, canActivate: [authGuard] },
  { path: 'operarios/mis-obras', component: MisObrasComponent, canActivate: [authGuard] },

{
  path: 'operarios/obras/:id',
  component: MiObraDetalleComponent,
  canActivate: [authGuard]
},

  { path: '**', redirectTo: 'home' }
];