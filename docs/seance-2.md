# Séance 2 sur 5 - Composants et communication

## 1) Objectifs pédagogiques

- Découper la home monolithique en composants réutilisables.
- Utiliser `input()` et `output()` pour la communication parent/enfant.
- Garder `App` comme container métier.

## 2) Prérequis concrets

- Avoir terminé la séance 1.
- Point de départ: tout est encore dans `App`.
- Aucun dossier `components/` pré-existant.

## 3) Explication théorique vulgarisée (contexte WishFlix)

Le découpage permet de réutiliser les cartes de jeux (home, wishlist, résultats), de réduire la taille du template principal et de clarifier la responsabilité de chaque fichier.

## 4) Lien avec le code du projet

- Création du dossier `src/app/components/`.
- Création de `game-card` puis `game-section`.
- `App` conserve les signaux catalogue/filtres/favoris.

## 5) Liste des sous-concepts

1. Créer `GameCardComponent` avec `input()`/`output()`.
2. Créer `GameSectionComponent` pour regrouper une section.
3. Brancher les favoris entre `App` et les composants enfants.

## 6) Liens vers les démos formateur

- Démos formateur: dossier `docs/demo/`.

## 7) Liens vers les exercices étudiants

- Exercices étudiants: dossier `docs/exercices/`.

## 8) Pistes d'extension (bonus)

- Ajouter la projection de contenu sur `GameSectionComponent`.
- Ajouter un mode d'affichage grille/liste.
