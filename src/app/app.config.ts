import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { AUTH_DATA_SOURCE } from '../features/auth/api/auth.contract';
import { authTokenInterceptor } from '../features/auth/api/auth-token.interceptor';
import { MockAuthDataSource } from '../features/auth/api/mock-auth.data-source';
import { GAME_CATALOG_DATA_SOURCE } from '../features/game/api/game-catalog.contract';
import { HttpGameCatalogDataSource } from '../features/game/api/http-game-catalog.data-source';
import { routes } from './app.routes';

/**
 * Le container DI mappe chaque token vers une implémentation concrète au démarrage.
 * AuthService/GameCatalogService restent découplés (ils dépendent des tokens, pas des classes).
 * Dans WishFlix, on peut brancher mock, HTTP réel ou double de test sans toucher au domaine.
 * Pour aller plus loin: https://angular.dev/guide/di/dependency-injection-providers
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    {
      provide: AUTH_DATA_SOURCE,
      useClass: MockAuthDataSource,
    },
    {
      provide: GAME_CATALOG_DATA_SOURCE,
      useClass: HttpGameCatalogDataSource,
    },
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
  ],
};
