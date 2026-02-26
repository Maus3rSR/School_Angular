# Séance 5 sur 5 - Formulaires et authentification

## 1) Objectifs pédagogiques

- Créer les formulaires réactifs de login et de recherche.
- Mettre en place le flux de connexion (login/logout + token).
- Ajouter un interceptor HTTP et finaliser la protection des routes.

## 2) Prérequis concrets

- Avoir terminé la séance 4.
- État de départ: pages et guard existent, mais pas de logique de formulaire/auth.
- Dossiers à créer pendant la séance: `services/` (auth), `interceptors/`.

## 3) Explication théorique vulgarisée (contexte WishFlix)

Cette séance transforme WishFlix en application privée partielle: l'utilisateur s'authentifie, le token est propagé automatiquement, et les pages protégées deviennent réellement sécurisées.

## 4) Lien avec le code du projet

- `src/app/pages/login/`: formulaire réactif de connexion.
- `src/app/services/auth.service.ts`: gestion token + état connecté.
- `src/app/interceptors/auth.interceptor.ts`: ajout du header Authorization.
- `src/app/app.config.ts`: enregistrement interceptor.

## 5) Liste des sous-concepts

1. Construire le formulaire login avec `FormGroup`.
2. Implémenter `AuthService` et le flux login/logout.
3. Ajouter l'interceptor et brancher le guard final.

## 6) Liens vers les démos formateur

- Démos formateur: dossier `docs/demo/`.

## 7) Liens vers les exercices étudiants

- Exercices étudiants: dossier `docs/exercices/`.

## 8) Questions d'auto-évaluation

- Pourquoi préférer Reactive Forms ici ?
- Où stocker le token et pourquoi ?
- Pourquoi un interceptor est plus propre qu'un header manuel dans chaque service ?

## 9) Pistes d'extension (bonus)

- Ajouter un validateur custom de mot de passe fort.
- Gérer la déconnexion automatique sur 401.
