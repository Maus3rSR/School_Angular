# Exercices etudiants - Seance 1

Objectif de la seance: reproduire la base vue en demo, puis appliquer les memes mecanismes Angular sur un autre mini-cas WishFlix.

## Sous-concept 1 - Signal catalogue dans App

### Exercice 1 (5-10 min) - Reproduction

Objectif: declarer un signal `games` dans `app.ts` avec 6 jeux.

Contraintes:

- Ne pas creer de nouveau composant.
- Garder l'interface visuelle actuelle.

Indice:

- Utiliser `signal<Game[]>([])`.

### Exercice 2 (5-10 min) - Transfert

Objectif: ajouter un signal `selectedCategory` + une methode `setCategory(category)`.

Attendu navigateur:

- Un clic sur une categorie change la valeur du signal (pas encore de filtre obligatoire ici).

## Sous-concept 2 - Rendre la grille dynamique avec @for

### Exercice 1 (5-10 min) - Reproduction

Objectif: passer toute la grille en `@for` avec `track game.id`.

### Exercice 2 (5-10 min) - Transfert

Objectif: afficher une 2e rangee "Top notes" basee sur un tableau derive (`topGames`).

Contraintes:

- `topGames` contient uniquement les jeux `rating >= 4.5`.
- Reutiliser la meme carte (pas de nouveau CSS).

Bloc UI fourni (copier/coller autorise):

```html
<section class="wishflix-catalogue">
  <h2 class="text-xl font-bold">Top notes</h2>
  <div class="wishflix-catalogue__grid">
    @for (game of topGames(); track game.id) {
    <article class="card movie-card game-card">
      <h3 class="card-title game-card__title">{{ game.title }}</h3>
    </article>
    }
  </div>
</section>
```

## Sous-concept 3 - Filtres et compteurs avec computed

### Exercice 1 (5-10 min) - Reproduction

Objectif: creer `showOnlyAvailable` + bouton toggle + compteur `visibleGames().length`.

### Exercice 2 (5-10 min) - Transfert

Objectif: ajouter un filtre de note minimale avec un signal `minRating`.

Contraintes:

- `minRating` commence a `0`.
- `visibleGames` combine disponibilite + note minimale.

Bloc UI fourni (copier/coller autorise):

```html
<div class="flex gap-2 items-center">
  <button type="button" class="btn btn-sm" (click)="decreaseMinRating()">-</button>
  <span>Note min: {{ minRating() }}</span>
  <button type="button" class="btn btn-sm" (click)="increaseMinRating()">+</button>
</div>
```
