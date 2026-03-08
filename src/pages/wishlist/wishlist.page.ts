import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GameCard } from '../../game/card/game-card.component';
import { GameCatalogService } from '../../core/services/game-catalog.service';

@Component({
  selector: 'wish-wishlist-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, GameCard],
  templateUrl: './wishlist.page.html',
  styleUrl: './wishlist.page.css',
})
export class WishlistPage {
  private readonly gameCatalog = inject(GameCatalogService);

  protected readonly wishlistGames = this.gameCatalog.wishlistGames;

  protected toggleWishlist(gameId: number): void {
    this.gameCatalog.toggleWishlist(gameId);
  }
}
