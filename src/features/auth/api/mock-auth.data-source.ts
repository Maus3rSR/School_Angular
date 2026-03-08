import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AuthDataSource, AuthSession } from './auth.contract';
import { MOCK_AUTH_ACCOUNT, MOCK_AUTH_PASSWORD } from './mock-auth.data';
import { LoginCredentials } from '../auth.model';

@Injectable()
export class MockAuthDataSource implements AuthDataSource {
  /**
   * Adapter mock: implémente le même contrat Observable qu'une future API HTTP d'auth.
   * of(...) simule une réponse asynchrone simple, utile pour développer l'UI sans backend.
   * Dans WishFlix, on valide le flux login/erreur dès maintenant puis on branchera l'API réelle.
   * Pour aller plus loin: https://rxjs.dev/api/index/function/of
   */
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
