import { Injectable, signal } from '@angular/core';

export type GenreJeu = 'Action' | 'RPG' | 'Strategie' | 'Aventure' | 'Multijoueur' | 'Independant';

export interface JeuCatalogue {
  id: number;
  titre: string;
  categorie: 'Nouveautes' | 'Populaires' | 'Classiques';
  genre: GenreJeu;
  anneeSortie: number;
  plateforme: string;
  note: number;
  synopsis: string;
  disponible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // TODO (Seance 3 - HttpClient): injecter HttpClient
  // Exemple: private http = inject(HttpClient);
  // Voir docs/seance-3.md

  // TODO (Seance 3 - HttpClient): implementer getGames() qui retourne Observable<JeuCatalogue[]>
  // Cette methode doit faire un appel GET vers l'API
  // Exemple: return this.http.get<JeuCatalogue[]>(`${environment.apiUrl}/games`);
  // Voir docs/seance-3.md
  getGames(): JeuCatalogue[] {
    // Methode volontairement vide pour la progression pedagogique.
    return [];
  }

  // TODO (Seance 4 - routes parametrees): implementer getGameById(id) qui retourne Observable<JeuCatalogue>
  // Cette methode doit faire un appel GET vers l'API avec l'ID
  // Exemple: return this.http.get<JeuCatalogue>(`${environment.apiUrl}/games/${id}`);
  // Voir docs/seance-4.md
  getGameById(id: number): JeuCatalogue | undefined {
    void id;
    // Methode volontairement vide pour la progression pedagogique.
    return undefined;
  }

  // TODO (Seance 3 - exercice): implementer toggleFavorite(gameId) qui retourne Observable<void>
  // Cette methode doit faire un appel POST vers l'API pour ajouter/retirer un favori
  // Exemple: return this.http.post<void>(`${environment.apiUrl}/favorites/${gameId}`, {});
  // Voir docs/seance-3.md
  toggleFavorite(gameId: number): void {
    void gameId;
    // Methode volontairement vide pour la progression pedagogique.
  }

  // TODO (Seance 4): implementer getFavorites() qui retourne Observable<JeuCatalogue[]>
  // Cette methode doit recuperer la liste des jeux favoris depuis l'API
  // Voir docs/seance-4.md
  getFavorites(): JeuCatalogue[] {
    // Methode volontairement vide pour la progression pedagogique.
    return [];
  }
}
