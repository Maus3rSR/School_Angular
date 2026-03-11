import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root',
})
export class GameDatasource {
  private readonly http = inject(HttpClient);

  fetchAll(): Observable<Game[]> {
    return this.http.get<Game[]>('data/games.json');
  }
}
