import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GameCard } from '../../features/game/components/card/game-card.component';
import { GameCatalogService } from '../../features/game/game-catalog.service';
import { GameSection } from '../../layouts/game-section/game-section';
import { FlixButton } from '../../ui/button/flix-button';

@Component({
  selector: 'wish-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink, FlixButton, GameCard, GameSection],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  private readonly gameCatalog = inject(GameCatalogService);

  /**
   * Façade de page: HomePage expose les lectures du service sans réimplémenter la logique métier.
   * Le template reste déclaratif, et les règles de filtrage/wishlist vivent dans GameCatalogService.
   * Dans WishFlix, cela facilite les tests et évite la duplication entre pages catalogue/detail.
   * Pour aller plus loin: https://angular.dev/guide/signals
   */
  protected readonly heroGame = this.gameCatalog.heroGame;
  protected readonly filteredGames = this.gameCatalog.filteredGames;
  protected readonly categories = this.gameCatalog.categories;
  protected readonly wishlistCount = this.gameCatalog.wishlistCount;
  protected readonly availableCount = this.gameCatalog.availableCount;
  protected readonly searchTerm = this.gameCatalog.searchTerm;
  protected readonly categoryFilter = this.gameCatalog.categoryFilter;
  protected readonly onlyAvailable = this.gameCatalog.onlyAvailable;
  protected readonly isLoading = this.gameCatalog.isLoading;
  protected readonly loadingError = this.gameCatalog.loadingError;

  /**
   * computed dérive un libellé UI à partir d'un état booléen, sans stocker une seconde variable.
   * La valeur est recalculée seulement si onlyAvailable change, donc comportement prévisible.
   * Cela garde le template lisible (pas de ternaire répété dans le HTML).
   * Pour aller plus loin: https://angular.dev/guide/signals#computed-signals
   */
  protected readonly filterAvailabilityLabel = computed(() =>
    this.onlyAvailable() ? 'Voir tout le catalogue' : 'Afficher seulement disponibles',
  );

  protected onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.gameCatalog.setSearchTerm(input?.value ?? '');
  }

  protected onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement | null;
    this.gameCatalog.setCategory(select?.value ?? 'all');
  }

  protected toggleOnlyAvailable(): void {
    this.gameCatalog.toggleOnlyAvailable();
  }

  protected toggleWishlist(gameId: number): void {
    this.gameCatalog.toggleWishlist(gameId);
  }

  protected isFavorite(gameId: number): boolean {
    return this.gameCatalog.isFavorite(gameId);
  }
}
