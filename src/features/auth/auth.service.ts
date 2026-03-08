import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { AUTH_DATA_SOURCE } from './auth.contract';
import { CurrentUser, LoginCredentials } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authDataSource = inject(AUTH_DATA_SOURCE);

  private readonly currentUserState = signal<CurrentUser | null>(null);
  private readonly tokenState = signal<string | null>(null);

  readonly currentUser = this.currentUserState.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserState() !== null);

  login(credentials: LoginCredentials): Observable<boolean> {
    return this.authDataSource.authenticate(credentials).pipe(
      tap((session) => {
        if (!session) {
          return;
        }

        this.currentUserState.set(session.user);
        this.tokenState.set(session.token);
      }),
      map((session) => session !== null),
    );
  }

  logout(): void {
    this.currentUserState.set(null);
    this.tokenState.set(null);
  }

  token(): string | null {
    return this.tokenState();
  }
}
