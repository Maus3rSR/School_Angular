import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './auth.service';

/**
 * Guard de route: protège /wishlist en vérifiant la session avant d'afficher la page.
 * Retourner un UrlTree déclenche une redirection contrôlée, sans navigation impérative dans le guard.
 * Dans WishFlix, on conserve redirectTo pour revenir automatiquement à la page demandée après login.
 * Pour aller plus loin: https://angular.dev/guide/routing/route-guards
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: { redirectTo: state.url },
  });
};
