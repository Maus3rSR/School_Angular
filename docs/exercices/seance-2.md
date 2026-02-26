# Exercices etudiants - Seance 2

## Sous-concept 1 - Creer GameCardComponent

### Exercice 1 (5-10 min)
Objectif: creer le fichier TS de `GameCardComponent` avec `input()` et `output()`.

Contraintes:
- `changeDetection: ChangeDetectionStrategy.OnPush`.
- `game` obligatoire.

### Exercice 2 (5-10 min)
Objectif: connecter le clic du bouton wishlist pour emettre l'id du jeu.

Indice:
- `favoriteToggle.emit(...)`.

## Sous-concept 2 - Creer GameSectionComponent

### Exercice 1 (5-10 min)
Objectif: creer `GameSectionComponent` avec inputs `title`, `games`, `favoriteIds`.

Contraintes:
- Ne pas dupliquer la logique metier dans ce composant.

### Exercice 2 (5-10 min)
Objectif: faire remonter l'evenement favori au parent.

Indice:
- Re-emission avec `$event`.

## Sous-concept 3 - Connecter les favoris

### Exercice 1 (5-10 min)
Objectif: ajouter `favoriteIds` en signal dans `App`.

### Exercice 2 (5-10 min)
Objectif: implementer `toggleFavorite(id)` avec `update()`.

Contraintes:
- Ajouter l'id si absent.
- Retirer l'id si present.
