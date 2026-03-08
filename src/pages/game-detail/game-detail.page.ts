import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { GameCatalogService } from '../../features/game/game-catalog.service';
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

  /**
   * toSignal relie un Observable Angular Router (paramMap) au modèle réactif par signaux.
   * initialValue évite un état undefined au premier rendu, utile pour le SSR et l'UX.
   * Dans WishFlix, la fiche se met à jour automatiquement quand l'id URL change.
   * Pour aller plus loin: https://angular.dev/ecosystem/rxjs-interop
   */
  private readonly paramMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  /**
   * computed transforme le paramètre de route en identifiant numérique validé.
   * Le garde-fou Number.isFinite évite de lancer une recherche invalide dans le catalogue.
   * On obtient un rendu robuste: détail si id valide, état "introuvable" sinon.
   * Pour aller plus loin: https://angular.dev/guide/signals#computed-signals
   */
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
