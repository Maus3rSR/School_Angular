# WishFlix

Mini projet pedagogique Angular.

L'objectif est de construire un mini Netflix "cheap" dédié aux jeux vidéo, pas à pas, en 5 séances de 3h30.

## Etat initial du projet

- Un seul composant d'entree: `App`.
- Toute l'UI est dans `src/app/app.template.html` (home monolithique).
- Donnees de depart en dur dans le HTML.
- Images placeholders via API:
  - `https://via.assets.so/game.png?id={id}&q=95&w=300&h=450&fit=cover`
- Pas de pre-decoupage initial en composants/pages/services/guards.

## Fonctionnalites metier

Au fil des seances, WishFlix met en place les fonctionnalites suivantes :

- Decouverte du catalogue de jeux (liste, recherche, filtres)
- Consultation de la fiche detail d'un jeu
- Gestion des favoris (ajout, retrait, page dediee)
- Navigation complete de l'application (home, detail, favoris, 404)
- Chargement des donnees depuis une API et gestion des erreurs
- Authentification utilisateur (login/logout)
- Protection des routes privees
- Injection automatique du token sur les requetes HTTP

## Stack

- Angular (standalone)
- TypeScript (strict)
- Tailwind CSS
- DaisyUI
- pnpm

## Demarrer le projet

```bash
pnpm install
pnpm start
```

Application disponible sur `http://localhost:4200/`.

## Scripts utiles

```bash
pnpm start   # dev server
pnpm build   # build de production
pnpm test    # tests unitaires
```

## Support pedagogique

Les supports de seance sont dans `docs/` :

- `docs/seance-1.md`
- `docs/seance-2.md`
- `docs/seance-3.md`
- `docs/seance-4.md`
- `docs/seance-5.md`

Supports associes :

- `docs/demos/` : demonstrations formateur avec rappels de code et fichiers a creer.
- `docs/exercices/` : exercices etudiants (1 a 2 exercices par sous-concept, 5-10 min).

Chaque seance contient:

1. Objectifs pedagogiques
2. Prerequis
3. Theorie vulgarisee
4. Lien avec le code
5. Liste des sous-concepts
6. Liens vers demos formateur
7. Liens vers exercices etudiants
8. Auto-evaluation
9. Bonus

## Documentation Angular recommandee

https://angular.dev/essentials
