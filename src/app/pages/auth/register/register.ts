import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  submitted = signal(false);
  errorMessage = signal<string | null>(null);

  registerForm = this.fb.nonNullable.group(
    {
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name:  ['', [Validators.required, Validators.minLength(2)]],
      email:      ['', [Validators.required, Validators.email]],
      password:   ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordsMatchValidator }
  );

  private passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm  = control.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  async onSubmit(): Promise<void> {
    this.submitted.set(true);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // ✅ Excluimos confirmPassword — el backend no lo espera
    const { confirmPassword, ...dataToSend } = this.registerForm.getRawValue();

    try {
      await this.authService.register(dataToSend);
      // redirigir al login tras registro exitoso
    } catch {
      this.errorMessage.set('Error al registrarse. Inténtalo de nuevo.');
    }
  }
}