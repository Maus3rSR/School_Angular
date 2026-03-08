import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { MOCK_AUTH_CREDENTIALS } from '../../features/auth/api/mock-auth.data';
import { AuthService } from '../../features/auth/auth.service';

type LoginForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'wish-login-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly form = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  protected loginError = '';

  protected readonly demoCredentials = MOCK_AUTH_CREDENTIALS;

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const success = await firstValueFrom(this.authService.login(this.form.getRawValue()));

    if (!success) {
      this.loginError = 'Identifiants invalides. Utilisez le compte demo.';
      return;
    }

    const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') ?? '/';
    void this.router.navigateByUrl(redirectTo);
  }
}
