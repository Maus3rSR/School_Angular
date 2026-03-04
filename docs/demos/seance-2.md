# Demos formateur - Seance 2

Objectif de la seance: passer d'un template monolithique a des composants reutilisables avec communication parent/enfant.

## Sous-concept 1 - Creer GameCardComponent

Objectif: creer le premier composant reutilisable.

Implementation pas a pas (ordre conseille):

1. Generer le dossier/fichiers `game-card`.
2. Poser l'API minimale du composant (`game`, `isFavorite`, `favoriteToggle`).
3. Brancher le template de carte sans logique metier.
4. Verifier qu'une carte s'affiche correctement avec des donnees mockees.

Dossiers/fichiers a creer:

- `src/app/components/game-card/game-card.component.ts`
- `src/app/components/game-card/game-card.component.html`
- `src/app/components/game-card/game-card.component.css`

Rappels de code a fournir:

```ts
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
})
export class GameCardComponent {
  // input.required: la carte ne peut pas fonctionner sans donnees de jeu.
  game = input.required<Game>();
  // input optionnel: valeur par defaut false si non fournie.
  isFavorite = input(false);
  // output: evenement emis vers le parent (App) avec l'id du jeu.
  favoriteToggle = output<number>();
}
```

Check rapide navigateur:

- Une carte affiche bien son titre/image.
- Le clic wishlist emet un evenement sans erreur console.

## Sous-concept 2 - Creer GameSectionComponent

Objectif: extraire la section + titre + liste.

Implementation pas a pas (ordre conseille):

1. Creer le composant `game-section`.
2. Declarer les inputs requis (`title`, `games`, `favoriteIds`).
3. Reemettre `favoriteToggle` vers le parent.
4. Deplacer le HTML de section depuis `app.template.html` vers ce composant.
5. Rendre les cartes via `<app-game-card>` dans la boucle `@for`.
6. (Optionnel) Ajouter un slot de section pour des actions d'entete (`section-actions`).

Dossiers/fichiers a creer:

- `src/app/components/game-section/game-section.component.ts`
- `src/app/components/game-section/game-section.component.html`
- `src/app/components/game-section/game-section.component.css`

Rappels de code a fournir:

```ts
export class GameSectionComponent {
  // input.required impose un contrat clair: le parent doit fournir ces 3 entrees.
  title = input.required<string>();
  games = input.required<Game[]>();
  favoriteIds = input.required<number[]>();
  // output garde un flux unidirectionnel: l'enfant emet un evenement, le parent decide quoi faire.
  favoriteToggle = output<number>();
}
```

```html
<!-- game-section.component.html -->
<section class="wishflix-catalogue">
  <div class="wishflix-catalogue__header">
    <h2 class="text-xl font-bold">{{ title() }}</h2>
    <!-- Slot optionnel au niveau section -->
    <ng-content select="[section-actions]" />
  </div>

  <div class="wishflix-catalogue__grid">
    @for (game of games(); track game.id) {
    <app-game-card
      [game]="game"
      [isFavorite]="favoriteIds().includes(game.id)"
      (favoriteToggle)="favoriteToggle.emit($event)"
    ></app-game-card>
    }
  </div>
</section>
```

```html
<!-- parent template -->
<app-game-section
  [title]="'Catalogue de jeux'"
  [games]="visibleGames()"
  [favoriteIds]="favoriteIds()"
  (favoriteToggle)="toggleFavorite($event)"
>
  <button section-actions type="button" class="btn btn-ghost btn-sm">Voir tout</button>
</app-game-section>
```

Check rapide navigateur:

- Le titre de section s'affiche via `title`.
- Les cartes s'affichent via `games`.
- Les cartes passent bien par `GameCardComponent` (plus de duplication HTML).
- Aucun etat metier n'est stocke dans `GameSectionComponent`.

## Sous-concept 3 - Connecter les favoris

Objectif: faire circuler les events enfant -> parent.

Implementation pas a pas (ordre conseille):

1. Creer `favoriteIds` dans `App` (source de verite).
2. Ecrire `toggleFavorite(id)` avec `update()` immutable.
3. Passer `favoriteIds()` au composant section.
4. Ecouter `(favoriteToggle)` pour appeler `toggleFavorite($event)`.

Fichiers a modifier:

- `src/app/app.ts`
- `src/app/app.template.html`

Rappels de code a fournir:

```ts
// Etat central des favoris dans App (parent).
protected readonly favoriteIds = signal<number[]>([]);

protected toggleFavorite(id: number): void {
  // Si l'id existe: on retire. Sinon: on ajoute (update immuable).
  this.favoriteIds.update((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
}
```

```html
<!-- Flux unidirectionnel: donnees descendantes via inputs, evenement montant via output -->
<app-game-section
  [title]="'Catalogue de jeux'"
  [games]="visibleGames()"
  [favoriteIds]="favoriteIds()"
  (favoriteToggle)="toggleFavorite($event)"
/>
```

Check rapide navigateur:

- Un clic favori ajoute/retire l'id.
- Le meme jeu reste coherent entre sections (etat centralise dans `App`).

## Sous-concept 4 (bonus) - Projection de contenu (slots)

Objectif: introduire les "slots" Angular avec `ng-content` pour rendre `GameCardComponent` plus flexible sans dupliquer le composant.

Implementation pas a pas (ordre conseille):

1. Ajouter des zones de projection dans `game-card.component.html`.
2. Garder les inputs/output existants (`game`, `isFavorite`, `favoriteToggle`).
3. Projeter du contenu different selon le contexte (ex: badge "Nouveau", bouton secondaire).
4. Verifier qu'une carte sans contenu projete continue de fonctionner.

Fichiers a modifier:

- `src/app/components/game-card/game-card.component.html`
- `src/app/app.template.html` (ou `home.page.html` selon l'etat du projet)

Rappels de code a fournir:

```html
<!-- game-card.component.html -->
<article class="card movie-card game-card">
  <figure>
    <img
      [ngSrc]="'https://via.assets.so/game.png?id=' + game().id + '&q=95&w=300&h=450&fit=cover'"
      [alt]="game().title"
      width="300"
      height="450"
    />
  </figure>

  <div class="card-body">
    <h3 class="card-title game-card__title">{{ game().title }}</h3>

    <!-- Slot "meta" (contenu optionnel injecte par le parent) -->
    <ng-content select="[card-meta]" />

    <div class="card-actions justify-end">
      <button type="button" class="btn btn-primary btn-sm" (click)="favoriteToggle.emit(game().id)">
        Wishlist
      </button>

      <!-- Slot "actions" pour ajouter des boutons sans toucher a l'API du composant -->
      <ng-content select="[card-actions]" />
    </div>
  </div>
</article>
```

```html
<!-- parent template -->
<app-game-card
  [game]="game"
  [isFavorite]="favoriteIds().includes(game.id)"
  (favoriteToggle)="toggleFavorite($event)"
>
  <p card-meta class="badge badge-secondary">{{ game.genre }}</p>
  <button card-actions type="button" class="btn btn-ghost btn-sm">Details</button>
</app-game-card>
```

Check rapide navigateur:

- La carte continue d'afficher son contenu de base.
- Le badge et le bouton "Details" apparaissent uniquement quand projetes par le parent.
- Aucun changement CSS necessaire (on reutilise les classes existantes).
