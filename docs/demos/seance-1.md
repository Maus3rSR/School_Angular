# Demos formateur - Seance 1

## Sous-concept 1 - Signal catalogue dans App

Objectif: sortir les donnees du HTML statique vers `app.ts`.

Implementation pas a pas (ordre conseille):

1. Creer/placer le type `Game` dans `app.ts`.
2. Copier les donnees statiques dans un signal `games`.
3. Verifier que le projet compile avant de toucher au template.

Fichiers a modifier:

- `src/app/app.ts`

Rappels de code a fournir:

```ts
import { Component, computed, signal } from '@angular/core';

// Type metier: structure d'un jeu dans le catalogue WishFlix.
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

// Signal principal: source de verite locale de la liste de jeux.
protected readonly games = signal<Game[]>([
  { id: 1, title: 'Cyber Nexus 2077', genre: 'RPG', category: 'Nouveautes', year: 2023, platform: 'PC, PS5, Xbox', rating: 4.5, synopsis: 'Un RPG futuriste dans un monde cyberpunk.', available: true },
  { id: 2, title: 'Stellar Odyssey', genre: 'Aventure', category: 'Nouveautes', year: 2023, platform: 'PC, PS5', rating: 4.8, synopsis: 'Une aventure spatiale epique.', available: true },
  { id: 3, title: 'Shadow Legends', genre: 'Action', category: 'Populaires', year: 2022, platform: 'PC, Xbox', rating: 4.2, synopsis: 'Combattez les forces des tenebres.', available: false },
  { id: 4, title: 'Racing Thunder', genre: 'Course', category: 'Populaires', year: 2022, platform: 'PS5, Xbox', rating: 4.0, synopsis: 'Des courses a couper le souffle.', available: true },
  { id: 5, title: 'Fantasy Kingdom', genre: 'RPG', category: 'Classiques', year: 2020, platform: 'PC', rating: 4.7, synopsis: 'Un monde fantastique vous attend.', available: true },
  { id: 6, title: 'Zombie Survival', genre: 'Horreur', category: 'Classiques', year: 2021, platform: 'PC, PS5, Xbox', rating: 3.9, synopsis: 'Survivez a l apocalypse zombie.', available: false },
]);
```

Resultat attendu navigateur:

- Rien ne change visuellement (normal), mais les donnees existent maintenant dans `app.ts`.

## Sous-concept 2 - Rendre la grille dynamique avec @for

Objectif: remplacer les cartes dupliquees en dur par une boucle `@for`.

Implementation pas a pas (ordre conseille):

1. Isoler une seule carte HTML (celle qui sera repetee).
2. Entourer la carte avec `@for (game of games(); track game.id)`.
3. Remplacer les valeurs statiques (`title`, image) par les bindings `game.*`.
4. Supprimer les cartes dupliquees restantes.

Fichiers a modifier:

- `src/app/app.template.html`

Rappels de code a fournir:

```html
<div class="wishflix-catalogue__grid">
  <!-- track game.id permet a Angular de reutiliser les cartes existantes au lieu de recreer tout le DOM -->
  @for (game of games(); track game.id) {
  <article class="card movie-card game-card" [attr.aria-label]="'Jeu ' + game.title">
    <!-- ngSrc active NgOptimizedImage (perf + bonnes pratiques image) -->
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

Implementation pas a pas (ordre conseille):

1. Ajouter le signal `showOnlyAvailable`.
2. Ajouter le `computed()` `visibleGames`.
3. Brancher la methode `toggleAvailabilityFilter()` au bouton.
4. Remplacer les usages de `games()` par `visibleGames()` dans la grille et le compteur.

Fichiers a modifier:

- `src/app/app.ts`
- `src/app/app.template.html`

Rappels de code a fournir:

```ts
// Etat UI: false = on affiche tout, true = seulement les jeux disponibles.
protected readonly showOnlyAvailable = signal(false);

// Etat derive: se recalcule automatiquement quand showOnlyAvailable ou games change.
protected readonly visibleGames = computed(() =>
  this.showOnlyAvailable() ? this.games().filter((g) => g.available) : this.games(),
);

protected toggleAvailabilityFilter(): void {
  // Update immutable du signal (pas de mutation directe).
  this.showOnlyAvailable.update((v) => !v);
}
```

```html
<!-- Un clic met a jour showOnlyAvailable, ce qui recalcule visibleGames() automatiquement -->
<button type="button" class="btn btn-primary" (click)="toggleAvailabilityFilter()">...</button>
<div class="stat-value text-primary">{{ visibleGames().length }}</div>
```

Resultat attendu navigateur:

- Le bouton alterne la liste complete / disponible.
- Le compteur se met a jour automatiquement.
