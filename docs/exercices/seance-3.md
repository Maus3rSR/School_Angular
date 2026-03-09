# Exercices etudiants - Seance 3

Objectif de la seance: reproduire le routing de base vu en demo, puis appliquer la meme logique sur un cas complementaire sans refaire le design.

## Sous-concept 1 - Creer les pages Detail et 404 en statique

### Exercice 1 (5-10 min) - Reproduction

Objectif: copier les snippets statiques `game-detail` et `not-found` depuis `docs/seance-3.md` section 9.

Contraintes:

- Aucun binding Angular dans le HTML (`{{ }}`, `@if`, `[ngSrc]`, `(click)`, etc.).
- Conserver les classes CSS telles quelles.

### Exercice 2 (5-10 min) - Transfert

Objectif: dupliquer la fiche detail statique avec un 2e jeu (autres valeurs) en gardant le schema `Game`.

Contraintes:

- Respecter tous les champs de `Game` (id, title, year, platforms, rating, category, description, available, hero, playtime, coverImage, backdropImage).

## Sous-concept 2 - Configurer router-outlet et routes

### Exercice 1 (5-10 min) - Reproduction

Objectif: declarer les routes `''`, `games/:id` et `**`.

### Exercice 2 (5-10 min) - Transfert

Objectif: ajouter une route statique `about` + un lien de navigation minimal.

Contraintes:

- La wildcard `**` doit rester la derniere route.
- Ne pas modifier le CSS.

Bloc UI fourni (copier/coller autorise):

```html
<nav class="flex gap-2">
  <a routerLink="/" class="btn btn-ghost btn-sm">Accueil</a>
  <a routerLink="/about" class="btn btn-ghost btn-sm">A propos</a>
</nav>
```

## Sous-concept 3 - Externaliser le state local avec signals

### Exercice 1 (5-10 min) - Reproduction

Objectif: creer `GameCatalogService` avec `signal<Game[]>` et `gameById(id)`.

### Exercice 2 (5-10 min) - Transfert

Objectif: ajouter un `computed()` `availableGames` (jeux disponibles seulement) et l'exposer a Home.

Contraintes:

- Pas de `any`.
- Pas de logique dupliquee dans les composants.

Attendu navigateur:

- La Home et la Detail lisent la meme source de donnees.
