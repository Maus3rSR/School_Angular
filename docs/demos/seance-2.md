# Demos formateur - Seance 2

## Sous-concept 1 - Creer GameCardComponent

Objectif: creer le premier composant reutilisable.

Dossiers/fichiers a creer:

- `src/app/components/game-card/game-card.component.ts`
- `src/app/components/game-card/game-card.component.html`
- `src/app/components/game-card/game-card.component.css`

Rappels de code a fournir:

```ts
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

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

## Sous-concept 2 - Creer GameSectionComponent

Objectif: extraire la section + titre + liste.

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

## Sous-concept 3 - Connecter les favoris

Objectif: faire circuler les events enfant -> parent.

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
