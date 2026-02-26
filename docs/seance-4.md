# Seance 4 sur 5 - Services, injection de dependances et routing

## 1) Objectifs pedagogiques

- Introduire un service metier pour centraliser les donnees films.
- Comprendre l'injection de dependances avec `inject()`.
- Mettre en place le routing (home, detail, favoris, 404).
- Charger les pages de facon lazy (chargement a la demande).

## 2) Prerequis concrets

- Avoir termine la seance 3.
- Fichiers a ouvrir:
  - `src/app/app.ts` (TODO `chargerCatalogueDepuisService()`)
  - `src/app/app.routes.ts` (TODO routing)
  - `src/app/app.config.ts`

## 3) Explication theorique vulgarisee (contexte mini Netflix)

Dans une vraie application, les films ne doivent pas etre copies dans plusieurs composants.
Un service joue le role de "source de verite" du catalogue.

Le routing permet de passer d'une vue a une autre:
- accueil pour parcourir,
- detail pour consulter un film,
- favoris pour retrouver sa selection.

Le lazy loading evite de charger toutes les pages d'un coup.

## 4) Lien avec le code du projet

- `app.routes.ts` est pret a recevoir la configuration des routes.
- `app.ts` contient un TODO pour deleguer le chargement des films au service.
- `app.config.ts` fournit deja le router via `provideRouter(routes)`.

## 5) Etapes de la demo formateur (recette)

### Demo A - Creer un service metier

1. Creer un service `CatalogueFilmsService`.
2. Y deplacer la liste de films et les operations principales.
3. Injecter ce service dans le composant parent avec `inject()`.

### Demo B - Declarer les routes

1. Ajouter les routes principales dans `app.routes.ts`.
2. Ajouter une route wildcard pour la 404.
3. Verifier la navigation de base.

### Demo C - Passer en lazy loading

1. Charger les pages via `loadComponent`.
2. Tester le comportement dans le navigateur.
3. Expliquer le benefice performance simplement.

## 6) Enonce de l'exercice etudiant (version 2)

Objectif: implementer une page detail film basee sur l'identifiant de route.

Contraintes:
- Le film vient du service, pas d'une duplication de donnees locale.
- Si l'id est inconnu, rediriger vers la page 404.
- Garder des noms metier explicites.

Resultat attendu:
- URL detail fonctionnelle,
- affichage coherent des informations du film,
- comportement propre en cas d'erreur.

## 7) Questions d'auto-evaluation

- Pourquoi introduire un service au lieu de laisser les donnees dans le composant?
- Comment sait-on quel film afficher dans la page detail?
- A quoi sert une route wildcard (`**`)?

## 8) Pistes d'extension (bonus)

- Ajouter une route pour une categorie (`/categorie/:nom`).
- Memoriser les favoris dans le service pour reutilisation inter-pages.
- Preparer un resolvers simple pour charger les donnees avant la page detail.
