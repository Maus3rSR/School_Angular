# Demos formateur - Seance 1

## Sous-concept 1 - Signal catalogue dans App

Objectif: sortir les donnees du HTML statique vers `app.ts`.

Fichiers a modifier:

- `src/app/app.ts`

Rappels de code a fournir:

```ts
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

type Game = {
  id: number;
  title: string;
  genre: string;
  category: string;
  year: number;
  platform: string;
  rating: number;
  synopsis: string;
  available: boolean;
};

protected readonly games = signal<Game[]>([
  { id: 1, title: 'Cyber Nexus 2077', genre: 'RPG', category: 'Nouveautes', year: 2023, platform: 'PC, PS5, Xbox', rating: 4.5, synopsis: '...', available: true },
]);
```

Resultat attendu navigateur:

- Rien ne change visuellement (normal), mais les donnees existent maintenant dans `app.ts`.

## Sous-concept 2 - Rendre la grille dynamique avec @for

Objectif: remplacer les cartes dupliquees en dur par une boucle `@for`.

Fichiers a modifier:

- `src/app/app.template.html`

Rappels de code a fournir:

```html
<div class="wishflix-catalogue__grid">
  @for (game of games(); track game.id) {
  <article class="card movie-card game-card" [attr.aria-label]="'Jeu ' + game.title">
    <img
      [ngSrc]="'https://via.assets.so/game.png?id=' + game.id + '&q=95&w=300&h=450&fit=cover'"
      [alt]="game.title"
      width="300"
      height="450"
      loading="lazy"
    />
    <h3 class="card-title game-card__title">{{ game.title }}</h3>
  </article>
  }
</div>
```

Resultat attendu navigateur:

- La grille est identique, mais pilotee par les donnees du signal.

## Sous-concept 3 - Filtres et compteurs avec computed

Objectif: filtrer la liste et afficher le nombre de jeux visibles.

Fichiers a modifier:

- `src/app/app.ts`
- `src/app/app.template.html`

Rappels de code a fournir:

```ts
protected readonly showOnlyAvailable = signal(false);
protected readonly visibleGames = computed(() =>
  this.showOnlyAvailable() ? this.games().filter((g) => g.available) : this.games(),
);

protected toggleAvailabilityFilter(): void {
  this.showOnlyAvailable.update((v) => !v);
}
```

```html
<button type="button" class="btn btn-primary" (click)="toggleAvailabilityFilter()">...</button>
<div class="stat-value text-primary">{{ visibleGames().length }}</div>
```

Resultat attendu navigateur:

- Le bouton alterne la liste complete / disponible.
- Le compteur se met a jour automatiquement.
