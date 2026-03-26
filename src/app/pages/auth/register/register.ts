import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  submitted = signal(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  registerForm = this.fb.nonNullable.group(
    {
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordsMatchValidator }
  );

  togglePassword(): void {
    this.showPassword.update(value => !value);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update(value => !value);
  }

  private passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  async onSubmit(): Promise<void> {
    this.submitted.set(true);
    this.errorMessage.set(null);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { confirmPassword, ...formData } = this.registerForm.getRawValue();

    const dataToSend = {
      ...formData,
      rol: 'operario' as const,
    };

    try {
      await this.authService.register(dataToSend);
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage.set(
        error?.error?.detail || 'Error al registrarse. Inténtalo de nuevo.'
      );
    }
  }
}