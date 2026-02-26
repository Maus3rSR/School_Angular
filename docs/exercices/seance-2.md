# Exercices etudiants - Seance 2

Objectif de la seance: reproduire le decoupage en composants vu en demo, puis reutiliser `input()`/`output()` sur un besoin complementaire.

## Sous-concept 1 - Creer GameCardComponent

### Exercice 1 (5-10 min) - Reproduction

Objectif: creer le fichier TS de `GameCardComponent` avec `input()` et `output()`.

Contraintes:

- `changeDetection: ChangeDetectionStrategy.OnPush`.
- `game` obligatoire.

### Exercice 2 (5-10 min) - Transfert

Objectif: ajouter un output `openDetails` pour emettre l'id quand on clique sur le titre de la carte.

Indice:

- Conserver `favoriteToggle` et ajouter un 2e evenement.

Bloc UI fourni (copier/coller autorise):

```html
<h3 class="card-title game-card__title">
  <button type="button" class="link link-hover" (click)="openDetails.emit(game().id)">
    {{ game().title }}
  </button>
</h3>
```

## Sous-concept 2 - Creer GameSectionComponent

### Exercice 1 (5-10 min) - Reproduction

Objectif: creer `GameSectionComponent` avec inputs `title`, `games`, `favoriteIds`.

Contraintes:

- Ne pas dupliquer la logique metier dans ce composant.

### Exercice 2 (5-10 min) - Transfert

Objectif: gerer le cas "liste vide" avec un input `emptyMessage` et un `@if` dans le template.

Indice:

- Le parent choisit le message, l'enfant l'affiche seulement.

Bloc UI fourni (copier/coller autorise):

```html
@if (games().length === 0) {
<p class="text-sm opacity-70">{{ emptyMessage() }}</p>
}
```

## Sous-concept 3 - Connecter les favoris

### Exercice 1 (5-10 min) - Reproduction

Objectif: ajouter `favoriteIds` en signal dans `App`.

### Exercice 2 (5-10 min) - Transfert

Objectif: afficher une section "Mes favoris" derivee de `favoriteIds` (sans nouveau CSS).

Contraintes:

- Ajouter l'id si absent.
- Retirer l'id si present.
- Creer un `computed()` pour la liste des jeux favoris.

Bloc UI fourni (copier/coller autorise):

```html
<section class="wishflix-catalogue">
  <h2 class="text-xl font-bold">Mes favoris</h2>
  <div class="wishflix-catalogue__grid">
    @for (game of favoriteGames(); track game.id) {
    <article class="card movie-card game-card">
      <h3 class="card-title game-card__title">{{ game.title }}</h3>
    </article>
    }
  </div>
</section>
```
