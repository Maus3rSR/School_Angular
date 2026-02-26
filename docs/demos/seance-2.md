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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
})
export class GameCardComponent {
  game = input.required<Game>();
  isFavorite = input(false);
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
  title = input.required<string>();
  games = input.required<Game[]>();
  favoriteIds = input.required<number[]>();
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
protected readonly favoriteIds = signal<number[]>([]);
protected toggleFavorite(id: number): void {
  this.favoriteIds.update((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
}
```

```html
<app-game-section
  [title]="'Catalogue de jeux'"
  [games]="visibleGames()"
  [favoriteIds]="favoriteIds()"
  (favoriteToggle)="toggleFavorite($event)"
/>
```
