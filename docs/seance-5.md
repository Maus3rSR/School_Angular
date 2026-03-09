# Séance 5 sur 5 - Formulaires et authentification

## 1) Objectifs pédagogiques

- Creer le formulaire reactif de login.
- Mettre en place le flux de connexion (login/logout + token).
- Finaliser la securisation avec `authGuard` et interceptor HTTP.

## 2) Prérequis concrets

- Avoir termine la seance 4.
- Etat de depart: routing + detail/404 + fetching HTTP en place, mais aucune authentification.
- Dossiers a creer pendant la seance: `features/auth/` et `pages/login/`.

## 3) Explication theorique vulgarisee (contexte WishFlix)

Cette seance transforme WishFlix en application partiellement privee: l'utilisateur se connecte, le token est reutilise automatiquement via l'interceptor, et les routes sensibles sont protegees par un guard.

## 4) Lien avec le code du projet

- `src/pages/login/`: formulaire reactif de connexion.
- `src/features/auth/auth.service.ts`: gestion session + token.
- `src/features/auth/auth.guard.ts`: protection de route `wishlist`.
- `src/features/auth/api/auth-token.interceptor.ts`: ajout du header Authorization.
- `src/app/app.config.ts`: enregistrement interceptor.

## 5) Liste des sous-concepts

1. Construire le formulaire login avec `FormGroup`.
2. Implémenter `AuthService` et le flux login/logout.
3. Ajouter `authGuard` + interceptor pour finaliser la securite.

## 6) Liens vers les demos formateur

- Demos formateur: dossier `docs/demos/`.

## 7) Liens vers les exercices etudiants

- Exercices etudiants: dossier `docs/exercices/`.

## 8) Pistes d'extension (bonus)

- Ajouter un validateur custom de mot de passe fort.
- Gerer la deconnexion automatique sur reponse 401.
