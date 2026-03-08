import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Game } from '../game.model';
import { GameCatalogDataSource } from './game-catalog.contract';

type GameDto = {
  id: number;
  title: string;
  year: number;
  platforms: string[];
  rating: number;
  category: Game['category'];
  description: string;
  available: boolean;
  hero: boolean;
  playtime: string;
  coverImage: string;
  backdropImage: string;
};

@Injectable()
export class HttpGameCatalogDataSource implements GameCatalogDataSource {
  private readonly http = inject(HttpClient);

  /**
   * Adapter HTTP: transforme une réponse API en contrat métier GameCatalogDataSource.
   * Ce mapping isole la structure réseau (DTO) du reste de l'application.
   * Dans WishFlix, on pourra changer d'endpoint sans impacter GameCatalogService.
   * Pour aller plus loin: https://angular.dev/guide/http/making-requests
   */
  fetchGames(): Observable<Game[]> {
    return this.http.get<GameDto[]>('/api/games.json').pipe(
      map((items) =>
        items.map((item) => ({
          ...item,
        })),
      ),
    );
  }
}
