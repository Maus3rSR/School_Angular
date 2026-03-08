import { computed, Injectable, signal } from '@angular/core';

import { CurrentUser, LoginCredentials } from '../models/auth.model';

const DEMO_ACCOUNT = {
  id: 1,
  name: 'Prof WishFlix',
  email: 'teacher@wishflix.dev',
} as const;

const DEMO_PASSWORD = 'wishflix123';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserState = signal<CurrentUser | null>(null);
  private readonly tokenState = signal<string | null>(null);

  readonly currentUser = this.currentUserState.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserState() !== null);

  login(credentials: LoginCredentials): boolean {
    const isValidEmail = credentials.email.trim().toLowerCase() === DEMO_ACCOUNT.email;
    const isValidPassword = credentials.password === DEMO_PASSWORD;

    if (!isValidEmail || !isValidPassword) {
      return false;
    }

    this.currentUserState.set({ ...DEMO_ACCOUNT });
    this.tokenState.set('wishflix-demo-token');
    return true;
  }

  logout(): void {
    this.currentUserState.set(null);
    this.tokenState.set(null);
  }

  token(): string | null {
    return this.tokenState();
  }
}
