import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { OperariosService } from '../../../services/operarios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private operariosService = inject(OperariosService);
  private router = inject(Router);

  loginForm: FormGroup;
  submitted = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    try {
      const response = await this.authService.login(this.loginForm.value);

      // Ajusta esto según cómo venga el token en tu backend
      localStorage.setItem('token', response.access_token);

      const me = await this.operariosService.getMe();

      switch (me.rol) {
        case 'operario':
          this.router.navigate(['/operarios']);
          break;

        case 'admin':
          this.router.navigate(['/admin']);
          break;

        default:
          this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error en login:', error);
    }
  }
}