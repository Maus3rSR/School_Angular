# Exercices etudiants - Seance 1

## Sous-concept 1 - Signal catalogue dans App

### Exercice 1 (5-10 min)
Objectif: declarer un signal `games` dans `app.ts` avec 3 jeux minimum.

Contraintes:
- Ne pas creer de nouveau composant.
- Garder l'interface visuelle actuelle.

Indice:
- Utiliser `signal<Game[]>([])`.

### Exercice 2 (5-10 min)
Objectif: ajouter le 4e, 5e et 6e jeu dans le signal.

Contraintes:
- Conserver la categorie `Games` pour les placeholders.

## Sous-concept 2 - Rendre la grille dynamique avec @for

### Exercice 1 (5-10 min)
Objectif: remplacer au moins 2 cartes statiques par une boucle `@for`.

Contraintes:
- Garder `track game.id`.
- Conserver les classes DaisyUI/BEM.

### Exercice 2 (5-10 min)
Objectif: passer toute la grille en `@for`.

Indice:
- Le bloc repetitif est la carte `article.card.movie-card.game-card`.

## Sous-concept 3 - Filtres et compteurs avec computed

### Exercice 1 (5-10 min)
Objectif: creer `showOnlyAvailable` + bouton toggle.

Contraintes:
- Methode dans `app.ts`.
- Binding `(click)` dans `app.template.html`.

### Exercice 2 (5-10 min)
Objectif: creer `visibleGames` en `computed()` et brancher le compteur.

Indice:
- `visibleGames().length` dans la stat "Jeux disponibles".
