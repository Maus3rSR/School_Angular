import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { CurrentUser, LoginCredentials } from '../auth.model';

export type AuthSession = {
  user: CurrentUser;
  token: string;
};

export type AuthDataSource = {
  authenticate(credentials: LoginCredentials): Observable<AuthSession | null>;
};

/**
 * InjectionToken + contrat: AuthService dépend d'une abstraction, pas d'une implémentation.
 * On garde un retour Observable pour être compatible avec un vrai endpoint HTTP plus tard.
 * Dans WishFlix, cela permet de switcher mock/API réelle/tests sans modifier la logique métier.
 * Pour aller plus loin: https://angular.dev/guide/di/dependency-injection-providers
 */
export const AUTH_DATA_SOURCE = new InjectionToken<AuthDataSource>('AUTH_DATA_SOURCE');
