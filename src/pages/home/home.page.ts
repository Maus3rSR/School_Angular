import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GameCard } from '../../game/card/game-card.component';
import { GameSection } from '../../layouts/game-section/game-section';
import { GameCatalogService } from '../../core/services/game-catalog.service';
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

  protected readonly heroGame = this.gameCatalog.heroGame;
  protected readonly filteredGames = this.gameCatalog.filteredGames;
  protected readonly categories = this.gameCatalog.categories;
  protected readonly wishlistCount = this.gameCatalog.wishlistCount;
  protected readonly availableCount = this.gameCatalog.availableCount;
  protected readonly searchTerm = this.gameCatalog.searchTerm;
  protected readonly categoryFilter = this.gameCatalog.categoryFilter;
  protected readonly onlyAvailable = this.gameCatalog.onlyAvailable;

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
