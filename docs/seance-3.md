# Séance 3 sur 5 - Services et HTTP

## 1) Objectifs pédagogiques

- Créer les premiers services métier du projet.
- Brancher `HttpClient` pour charger le catalogue depuis API.
- Relier Observable et Signals (`toSignal()`).

## 2) Prérequis concrets

- Avoir terminé la séance 2.
- État de départ: composants créés en séance 2, mais aucun service.
- Dossier `src/app/services/` à créer pendant cette séance.

## 3) Explication théorique vulgarisée (contexte WishFlix)

Le service devient la source de vérité des jeux. Cela évite de dupliquer la logique dans plusieurs composants et prépare l'application aux vraies données backend.

## 4) Lien avec le code du projet

- `src/app/services/game.service.ts`: appels HTTP catalogue.
- `src/app/app.config.ts`: `provideHttpClient()`.
- `src/environments/`: URLs API dev/prod.
- `src/app/app.ts`: consommation via `toSignal()`.

## 5) Liste des sous-concepts

1. Créer `GameService` et injecter `HttpClient`.
2. Charger les jeux depuis l'API et remplacer les données en dur.
3. Gérer `isLoading` et `error` dans l'UI.

## 6) Liens vers les démos formateur

- Démos formateur: dossier `docs/demo/`.

## 7) Liens vers les exercices étudiants

- Exercices étudiants: dossier `docs/exercices/`.

## 8) Pistes d'extension (bonus)

- Ajouter un cache mémoire dans le service.
- Ajouter un filtre de recherche côté backend.
