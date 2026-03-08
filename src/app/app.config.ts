import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { AUTH_DATA_SOURCE } from '../features/auth/auth.contract';
import { authTokenInterceptor } from '../features/auth/auth-token.interceptor';
import { MockAuthDataSource } from '../features/auth/mock-auth.data-source';
import { GAME_CATALOG_DATA_SOURCE } from '../features/game/game-catalog.contract';
import { HttpGameCatalogDataSource } from '../features/game/http-game-catalog.data-source';
import { routes } from './app.routes';

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
