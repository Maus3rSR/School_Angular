# Séance 1 sur 5 - Fondations Angular dans App

## 1) Objectifs pédagogiques

- Partir du template HTML statique et brancher la logique Angular.
- Découvrir `signal()`, `computed()` et `effect()`.
- Utiliser interpolation, property binding et event binding.
- Introduire `@for` et `@if` sur le catalogue WishFlix.

## 2) Prérequis concrets

- Lancer le projet avec `pnpm start`.
- État de départ attendu:
  - `src/app/app.ts`
  - `src/app/app.template.html`
  - `src/app/app.css`
- Pas de composants/pages/services dédiés à ce stade.

## 3) Explication théorique vulgarisée (contexte WishFlix)

On part d'une home monolithique avec 6 jeux en dur. Le but est de la rendre dynamique progressivement sans changer le design:

- les données passent du HTML vers des signaux,
- la liste devient pilotée par `@for`,
- les filtres deviennent pilotés par `computed()`.

## 4) Lien avec le code du projet

- `src/app/app.ts`: création des signaux et des méthodes.
- `src/app/app.template.html`: remplacement progressif du statique par des bindings.

## 5) Liste des sous-concepts

1. Créer le signal catalogue à partir des données statiques.
2. Rendre la grille dynamique avec `@for`.
3. Ajouter filtres et compteur avec `computed()` + `@if`.

## 6) Liens vers les démos formateur

- Démos formateur: dossier `docs/demo/`.

## 7) Liens vers les exercices étudiants

- Exercices étudiants: dossier `docs/exercices/`.

## 8) Questions d'auto-évaluation

- Pourquoi `signal()` est plus pratique qu'une variable classique ici ?
- Quand utiliser `computed()` plutôt qu'une méthode classique ?
- Que change `@for (...; track ...)` sur une liste de cartes ?

## 9) Pistes d'extension (bonus)

- Ajouter un tri par note.
- Sauvegarder le filtre actif dans `localStorage`.
