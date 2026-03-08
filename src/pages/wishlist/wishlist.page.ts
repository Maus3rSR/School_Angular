import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GameCard } from '../../features/game/components/card/game-card.component';
import { GameCatalogService } from '../../features/game/game-catalog.service';

@Component({
  selector: 'wish-wishlist-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, GameCard],
  templateUrl: './wishlist.page.html',
  styleUrl: './wishlist.page.css',
})
export class WishlistPage {
  private readonly gameCatalog = inject(GameCatalogService);

  /**
   * Façade de page: la wishlist lit l'état dérivé du service au lieu de recalculer localement.
   * On garde une seule source de vérité pour favoris, ce qui évite les désynchronisations entre pages.
   * Dans WishFlix, retirer un jeu ici met aussi à jour le compteur global immédiatement.
   * Pour aller plus loin: https://angular.dev/guide/signals
   */
  protected readonly wishlistGames = this.gameCatalog.wishlistGames;

  protected toggleWishlist(gameId: number): void {
    this.gameCatalog.toggleWishlist(gameId);
  }
}
