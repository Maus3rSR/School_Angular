# Séance 4 sur 5 - HTTP et environnements

## 1) Objectifs pédagogiques

- Brancher `HttpClient` pour charger le catalogue depuis une URL configurable.
- Gérer les etats `loading` et `error` dans l'UI.
- Utiliser `environment.development.ts` et `environment.ts` pour differencier mock local et API.

## 2) Prérequis concrets

- Avoir termine la seance 3.
- Etat de depart: routing detail/404 en place et service de state local avec signaux.
- `src/environments/` existe mais n'est pas encore exploite pour le catalogue.

## 3) Explication theorique vulgarisee (contexte WishFlix)

Cette seance connecte enfin WishFlix a des donnees externes. On garde un seul service metier, mais sa source de donnees devient HTTP. Le changement de source (mock JSON local en dev, URL API en prod) se fait via les fichiers d'environnement.

## 4) Lien avec le code du projet

- `src/features/game/game-catalog.service.ts`: chargement HTTP + gestion `loading/error`.
- `src/app/app.config.ts`: `provideHttpClient()`.
- `src/environments/environment.development.ts`: URL mock locale en dev.
- `src/environments/environment.ts`: URL API (ou URL cible de prod).

## 5) Liste des sous-concepts

1. Injecter `HttpClient` et appeler l'endpoint catalogue.
2. Relier l'URL de base a `environment.apiUrl`.
3. Afficher `loading` / `error` dans la page Home.

## 6) Liens vers les demos formateur

- Demos formateur: dossier `docs/demos/`.

## 7) Liens vers les exercices etudiants

- Exercices etudiants: dossier `docs/exercices/`.

## 8) Pistes d'extension (bonus)

- Ajouter une strategie de retry simple sur erreur reseau.
- Ajouter un cache memoire pour eviter des appels repetes au catalogue.
