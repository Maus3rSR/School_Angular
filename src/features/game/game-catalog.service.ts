import { computed, Injectable, signal } from '@angular/core';

import { Game, GameCategory } from './game.model';
import { MOCK_GAMES } from './mock-games';

export type CategoryFilter = 'all' | GameCategory;

@Injectable({ providedIn: 'root' })
export class GameCatalogService {
  private readonly gamesState = signal<Game[]>(MOCK_GAMES);
  private readonly wishlistIdsState = signal<number[]>([]);
  private readonly searchTermState = signal('');
  private readonly categoryFilterState = signal<CategoryFilter>('all');
  private readonly onlyAvailableState = signal(false);

  readonly games = this.gamesState.asReadonly();
  readonly wishlistIds = this.wishlistIdsState.asReadonly();
  readonly searchTerm = this.searchTermState.asReadonly();
  readonly categoryFilter = this.categoryFilterState.asReadonly();
  readonly onlyAvailable = this.onlyAvailableState.asReadonly();

  readonly heroGame = computed(
    () => this.gamesState().find((game) => game.hero) ?? this.gamesState()[0] ?? null,
  );

  readonly categories = computed<ReadonlyArray<CategoryFilter>>(() => {
    const categorySet = new Set<GameCategory>();
    for (const game of this.gamesState()) {
      categorySet.add(game.category);
    }
    return ['all', ...Array.from(categorySet)];
  });

  readonly filteredGames = computed(() => {
    const search = this.searchTermState().trim().toLowerCase();
    const category = this.categoryFilterState();
    const onlyAvailable = this.onlyAvailableState();

    return this.gamesState().filter((game) => {
      const matchesSearch =
        search.length === 0 ||
        game.title.toLowerCase().includes(search) ||
        game.description.toLowerCase().includes(search);
      const matchesCategory = category === 'all' || game.category === category;
      const matchesAvailability = !onlyAvailable || game.available;
      return matchesSearch && matchesCategory && matchesAvailability;
    });
  });

  readonly wishlistGames = computed(() => {
    const ids = this.wishlistIdsState();
    return this.gamesState().filter((game) => ids.includes(game.id));
  });

  readonly wishlistCount = computed(() => this.wishlistIdsState().length);

  readonly availableCount = computed(
    () => this.gamesState().filter((game) => game.available).length,
  );

  setSearchTerm(value: string): void {
    this.searchTermState.set(value);
  }

  setCategory(value: string): void {
    if (!this.isCategoryFilter(value)) {
      return;
    }

    this.categoryFilterState.set(value);
  }

  toggleOnlyAvailable(): void {
    this.onlyAvailableState.update((current) => !current);
  }

  toggleWishlist(gameId: number): void {
    this.wishlistIdsState.update((ids) =>
      ids.includes(gameId) ? ids.filter((id) => id !== gameId) : [...ids, gameId],
    );
  }

  isFavorite(gameId: number): boolean {
    return this.wishlistIdsState().includes(gameId);
  }

  gameById(gameId: number): Game | undefined {
    return this.gamesState().find((game) => game.id === gameId);
  }

  private isCategoryFilter(value: string): value is CategoryFilter {
    return value === 'all' || this.categories().some((category) => category === value);
  }
}
