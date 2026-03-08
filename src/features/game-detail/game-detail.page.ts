import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { GameCatalogService } from '../../core/services/game-catalog.service';
import { FlixButton } from '../../ui/button/flix-button';

@Component({
  selector: 'wish-game-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink, FlixButton],
  templateUrl: './game-detail.page.html',
  styleUrl: './game-detail.page.css',
})
export class GameDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly gameCatalog = inject(GameCatalogService);
  private readonly paramMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  protected readonly game = computed(() => {
    const idParam = this.paramMap().get('id');
    const gameId = Number(idParam);

    if (!Number.isFinite(gameId)) {
      return undefined;
    }

    return this.gameCatalog.gameById(gameId);
  });

  protected isFavorite(gameId: number): boolean {
    return this.gameCatalog.isFavorite(gameId);
  }

  protected toggleWishlist(gameId: number): void {
    this.gameCatalog.toggleWishlist(gameId);
  }
}
