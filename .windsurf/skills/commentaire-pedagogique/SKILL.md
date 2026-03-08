---
name: commentaire-pedagogique
description: Ajouter des commentaires pédagogiques avec lien vers la documentation officielle
---

- Ajouter uniquement des commentaires sur des notions clés JavaScript/TypeScript/Angular (pas de paraphrase évidente du code).
- Chaque commentaire doit détailler le concept de manière concise en **3 à 5 lignes maximum**, tout en incluant autant d'informations utiles que possible pour faciliter la compréhension.
- Chaque commentaire doit inclure **au moins 1 lien** vers la documentation officielle du concept (privilégier `https://angular.dev`). Pour les notions JavaScript ou TypeScript complexes pour les débutants, utiliser MDN ou la doc TypeScript officielle. Si plusieurs concepts sont combinés, plusieurs liens peuvent être ajoutés.
- Format recommandé:
  - Ligne 1: nom du concept + rôle concret dans le projet.
  - Lignes 2-4: explication technique du comportement, de l'impact sur les performances ou la maintenabilité, et justification du choix dans le contexte de WishFlix.
  - Ligne 5: lien "Pour aller plus loin" vers la doc.
- Concepts prioritaires à commenter dans WishFlix: `signal`, `computed`, `@for`, `@if`, `input()/output()`, routing, guard, interceptor, reactive forms.
- Écrire les commentaires en français simple, niveau débutant en reconversion avec quelques détails techniques.
- Exemple:
  - `@for` répète un bloc de template sur une liste de données.
  - Avec `track`, Angular réutilise les éléments DOM existants et évite des recréations inutiles.
  - Cela améliore les performances quand la liste change (filtres, tris, refresh API).
  - Dans WishFlix, c'est utile pour le rendu des cartes de jeux.
  - Pour aller plus loin: https://angular.dev/guide/templates/control-flow
