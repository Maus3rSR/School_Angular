import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { CurrentUser, LoginCredentials } from './auth.model';

export type AuthSession = {
  user: CurrentUser;
  token: string;
};

export type AuthDataSource = {
  authenticate(credentials: LoginCredentials): Observable<AuthSession | null>;
};

export const AUTH_DATA_SOURCE = new InjectionToken<AuthDataSource>('AUTH_DATA_SOURCE');
