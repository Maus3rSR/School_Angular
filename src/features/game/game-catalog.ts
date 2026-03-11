import { computed, inject, Injectable, signal } from '@angular/core';
import { Game } from './game.model';
import { GameDatasource } from './game-datasource';
import { delay } from 'rxjs';

type State = 'IDLE' | 'LOADING' | 'ERROR' | 'LOADED';

@Injectable({
  providedIn: 'root',
})
export class GameCatalog {
  private readonly _dataSource = inject(GameDatasource);

  protected readonly _state = signal<State>('IDLE');

  // signal<boolean>: stocke l'etat local du filtre "disponibles uniquement".
  // Quand sa valeur change, Angular notifie automatiquement les lectures reactives du template.
  // Dans WishFlix, ce booleen permet d'alterner instantanement entre tout le catalogue et les jeux disponibles.
  // Pour aller plus loin: https://angular.dev/guide/signals
  protected readonly _onlyAvailable = signal<boolean>(false);

  // Protection au runtime, de l'objet signal associé pour être
  // certain que le signal ne peut pas être modifié à l'exterieur
  readonly onlyAvailable = this._onlyAvailable.asReadonly();

  // signal<Game[]>: source de verite locale du catalogue affiche.
  // Ce modele centralise les donnees et evite de dupliquer la meme liste dans plusieurs variables.
  // Dans WishFlix, on garde une base unique pour le filtrage, les stats et la wishlist.
  // Pour aller plus loin: https://angular.dev/guide/signals
  protected readonly games = signal<Game[]>([]);

  // signal<number[]>: stocke uniquement les ids favoris, pas des objets Game complets.
  // Ce choix reduit la duplication memoire et simplifie les operations d'ajout/suppression.
  // Dans WishFlix, la wishlist reste synchronisee avec le catalogue sans copie de donnees.
  // Pour aller plus loin: https://angular.dev/guide/signals
  protected _favoriteGameIds = signal<number[]>([]);

  readonly favoriteGameIds = this._favoriteGameIds.asReadonly();

  // computed(): derive la liste visible depuis games() et onlyAvailable().
  // Angular met en cache le resultat et ne recalcule que si une dependance reactive change.
  // Dans WishFlix, ce pattern garde le filtre lisible et performant meme quand la grille grandit.
  // Pour aller plus loin: https://angular.dev/guide/signals
  readonly visibleGames = computed(() => {
    if (!this._onlyAvailable()) return this.games();
    return this.games().filter((game) => game.available);
  });

  loadGames(): void {
    this._state.set('LOADING');

    this._dataSource
      .fetchAll()
      .pipe(delay(2000))
      .subscribe({
        next: (games) => {
          this.games.set(games);
          this._state.set('LOADED');
        },
      });
  }

  filterByAvailibility(): void {
    // update() produit une nouvelle valeur a partir de l'ancienne, sans mutation manuelle.
    // Cette ecriture immutable declenche proprement le recalcul des computed dependants.
    // Dans WishFlix, un clic sur le bouton suffit pour rafraichir toutes les cartes affichees.
    // Pour aller plus loin: https://angular.dev/guide/signals
    this._onlyAvailable.update((available) => !available);
  }

  // update() sur un tableau permet d'ajouter ou retirer un favori de facon pure et previsible.
  // La source de verite reste dans App, ce qui facilite les tests et les evolutions futures.
  // Dans WishFlix, chaque carte emet une intention et le parent maintient l'etat global coherent.
  // Pour aller plus loin: https://angular.dev/guide/signals
  toggleFavorite(gameId: number): void {
    this._favoriteGameIds.update((gameIds) => {
      const isGameAlreadyFavorite = gameIds.includes(gameId);
      if (!isGameAlreadyFavorite) return [...gameIds, gameId];
      return gameIds.filter((oldGameId) => oldGameId !== gameId);
    });
  }

  // Methode de lecture: traduit l'etat global favoriteGameIds en booleen pour la carte courante.
  // Garder ce calcul dans la classe evite des expressions longues et peu lisibles dans le template.
  // Dans WishFlix, l'etat visuel du bouton wishlist reste aligne avec la source de verite.
  // Pour aller plus loin: https://angular.dev/guide/templates/expression-syntax
  isFavorite(gameId: number): boolean {
    return this._favoriteGameIds().includes(gameId);
  }

  getGameSheet(gameId: number): Game | undefined {
    return this.games().find((game) => game.id === gameId);
  }

  isState(state: State): boolean {
    return this._state() === state;
  }
}
