# Séance 4 sur 5 - Routing et navigation

## 1) Objectifs pédagogiques

- Mettre en place le routing multi-pages.
- Créer des pages avec routes lazy (`home`, `detail/:id`, `wishlist`, `404`).
- Protéger des routes avec un guard.

## 2) Prérequis concrets

- Avoir terminé la séance 3.
- État de départ: pas de dossier `pages/`, pas de guard.
- `src/app/app.routes.ts` existe mais reste vide avant la démo.

## 3) Explication théorique vulgarisée (contexte WishFlix)

Le routing transforme WishFlix en vraie SPA: on garde la fluidité d'une app, tout en ayant des URLs partageables (`/home`, `/game/3`, `/wishlist`).

## 4) Lien avec le code du projet

- `src/app/pages/`: création des pages.
- `src/app/app.routes.ts`: déclaration des routes lazy et de la 404.
- `src/app/guards/auth.guard.ts`: protection des zones privées.

## 5) Liste des sous-concepts

1. Créer les pages standalone nécessaires.
2. Configurer les routes lazy + route paramétrée.
3. Créer et brancher `authGuard`.

## 6) Liens vers les démos formateur

- Démos formateur: dossier `docs/demo/`.

## 7) Liens vers les exercices étudiants

- Exercices étudiants: dossier `docs/exercices/`.

## 8) Questions d'auto-évaluation

- Quand utiliser `loadComponent` ?
- Pourquoi la route `**` doit rester en dernier ?
- Que doit retourner un guard pour rediriger ?

## 9) Pistes d'extension (bonus)

- Ajouter un resolver pour précharger la page détail.
- Ajouter un guard `canDeactivate` sur le formulaire login.
