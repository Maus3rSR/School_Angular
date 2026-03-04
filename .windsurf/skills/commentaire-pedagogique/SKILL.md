---
name: commentaire-pedagogique
description: Ajouter des commentaires pédagogiques avec lien vers la documentation officielle
---

- Ajouter uniquement des commentaires utiles pédagogiquement (pas de paraphrase évidente du code).
- Chaque commentaire doit expliquer le concept en **1 à 5 lignes maximum**.
- Chaque commentaire doit inclure **1 lien** vers la documentation officielle du concept (priorité à `https://angular.dev`).
- Format recommandé:
  - Ligne 1: nom du concept + rôle concret dans le projet.
  - Lignes 2-4: impact technique (comportement, perf, maintenabilité, UX).
  - Ligne 5: lien "Pour aller plus loin" vers la doc.
- Concepts prioritaires à commenter dans WishFlix: `signal`, `computed`, `@for`, `@if`, `input()/output()`, routing, guard, interceptor, reactive forms.
- Écrire les commentaires en français simple, niveau débutant en reconversion.
- Exemple:
  - `@for` répète un bloc de template sur une liste de données.
  - Avec `track`, Angular réutilise les éléments DOM existants et évite des recréations inutiles.
  - Cela améliore les performances quand la liste change (filtres, tris, refresh API).
  - Dans WishFlix, c'est utile pour le rendu des cartes de jeux.
  - Pour aller plus loin: https://angular.dev/guide/templates/control-flow
