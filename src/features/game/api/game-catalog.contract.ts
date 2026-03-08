import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { Game } from '../game.model';

export type GameCatalogDataSource = {
  fetchGames(): Observable<Game[]>;
};

/**
 * InjectionToken + contrat: GameCatalogService dépend d'une interface, pas d'une classe concrète.
 * Ce découplage permet de brancher HTTP, mock local ou double de test sans changer le service.
 * Dans WishFlix, l'architecture reste évolutive quand on remplace /api/games.json par une vraie API.
 * Pour aller plus loin: https://angular.dev/guide/di/dependency-injection-providers
 */
export const GAME_CATALOG_DATA_SOURCE = new InjectionToken<GameCatalogDataSource>(
  'GAME_CATALOG_DATA_SOURCE',
);
