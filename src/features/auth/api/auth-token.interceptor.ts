import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../auth.service';

/**
 * Interceptor HTTP: point central pour ajouter le token sans le répéter dans chaque appel API.
 * request est immuable, donc clone() crée une nouvelle requête avec l'en-tête Authorization.
 * Dans WishFlix, le catalogue HTTP et les futures APIs partagent cette règle de sécurité.
 * Pour aller plus loin: https://angular.dev/guide/http/interceptors
 */
export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const token = authService.token();

  if (!token) {
    return next(request);
  }

  const authenticatedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authenticatedRequest);
};
