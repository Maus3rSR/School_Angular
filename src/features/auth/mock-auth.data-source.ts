import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AuthDataSource, AuthSession } from './auth.contract';
import { MOCK_AUTH_ACCOUNT, MOCK_AUTH_PASSWORD } from './mock-auth.data';
import { LoginCredentials } from './auth.model';

@Injectable()
export class MockAuthDataSource implements AuthDataSource {
  authenticate(credentials: LoginCredentials): Observable<AuthSession | null> {
    const isValidEmail = credentials.email.trim().toLowerCase() === MOCK_AUTH_ACCOUNT.email;
    const isValidPassword = credentials.password === MOCK_AUTH_PASSWORD;

    if (!isValidEmail || !isValidPassword) {
      return of(null);
    }

    return of({
      user: { ...MOCK_AUTH_ACCOUNT },
      token: 'wishflix-demo-token',
    });
  }
}
