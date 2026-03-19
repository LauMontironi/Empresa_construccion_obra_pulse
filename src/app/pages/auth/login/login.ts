import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { OperariosService } from '../../../services/operarios';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private operariosService = inject(OperariosService);
  private router = inject(Router);

  
  submitted = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  

  async onSubmit(): Promise<void> {
  this.submitted.set(true);

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  try {
    const { email, password } = this.loginForm.getRawValue(); // línea 42 ← aquí reemplazas
    const response = await this.authService.login({           // línea 43
      email: email!,                                          // ← añade el !
      password: password!                                     // ← añade el !
    });
    localStorage.setItem('token', response.access_token);

    const me = await this.operariosService.getMe();
    const rutas: Record<string, string> = {
      operario: '/operarios',
      admin: '/admin',
    };
    this.router.navigate([rutas[me.rol] ?? '/home']);

  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 500) {
        this.errorMessage.set('Error en el servidor. Contacta al administrador.');
      } else if (error.status === 401) {
        this.errorMessage.set('Email o contraseña incorrectos.');
      } else {
        this.errorMessage.set('Error inesperado. Inténtalo de nuevo.');
      }
    }
  }
}
}