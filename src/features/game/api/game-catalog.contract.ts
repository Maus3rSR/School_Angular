import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { Game } from '../game.model';

export type GameCatalogDataSource = {
  fetchGames(): Observable<Game[]>;
};

export const GAME_CATALOG_DATA_SOURCE = new InjectionToken<GameCatalogDataSource>(
  'GAME_CATALOG_DATA_SOURCE',
);
