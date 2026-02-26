# Séance 4 sur 5 - Routing et navigation

## 1) Objectifs pédagogiques

- Configurer le routing Angular pour créer une SPA multi-pages
- Utiliser les **routes paramétrées** (`:id`) pour les pages de détail
- Maîtriser la **navigation programmatique** avec Router
- Implémenter le **lazy loading** pour optimiser les performances
- Protéger des routes avec les **guards** (canActivate, canMatch)
- Créer une page 404 personnalisée

## 2) Prérequis concrets

- Avoir terminé la séance 3 (GameService avec appels HTTP)
- Fichiers à ouvrir :
  - `src/app/app.routes.ts` (tableau vide à compléter)
  - `src/app/app.config.ts` (déjà configuré avec `provideRouter`)
  - `src/app/pages/game-detail/` (composant avec template complet, logique vide)
  - `src/app/pages/wishlist/` (composant avec template complet, logique vide)
  - `src/app/guards/auth.guard.ts` (structure vide à compléter)
- **État initial** :
  - ✅ Tous les composants de pages existent avec leurs templates HTML complets
  - ✅ La navbar avec les liens existe visuellement
  - ❌ `app.routes.ts` est vide (tableau vide)
  - ❌ Aucune logique dans les composants de pages
  - 📝 Des TODO indiquent où ajouter les routes

## 3) Explication théorique vulgarisée (contexte WishFlix)

### Pourquoi le routing ?

Une **SPA** (Single Page Application) ne recharge jamais la page entière. Le routing permet de :

- Changer de "page" sans rechargement (navigation fluide)
- Avoir des URLs différentes pour chaque vue (`/home`, `/game/42`, `/favorites`)
- Utiliser le bouton "retour" du navigateur
- Partager des liens directs vers une page spécifique

### Routes paramétrées

Pour afficher le détail d'un jeu, on utilise une **route paramétrée** :

```typescript
{ path: 'game/:id', component: GameDetailComponent }
```

L'URL `/game/42` charge GameDetailComponent avec `id = 42`.

### Navigation programmatique

Deux façons de naviguer :

- **Déclarative** : `<a routerLink="/favorites">Favoris</a>` dans le template
- **Programmatique** : `router.navigate(['/game', gameId])` dans le code TypeScript

### Lazy loading

Au lieu de charger tous les composants au démarrage, on les charge **à la demande** :

```typescript
{ path: 'favorites', loadComponent: () => import('./favorites/favorites.component') }
```

Résultat : l'app démarre plus vite, seules les pages visitées sont téléchargées.

### Guards : protéger les routes

Les **guards** contrôlent l'accès aux routes :

- `canActivate` : peut-on accéder à cette route ? (ex: utilisateur connecté ?)
- `canMatch` : cette route correspond-elle ? (ex: selon le rôle utilisateur)

### Page 404

La route wildcard `**` capture toutes les URLs non reconnues :

```typescript
{ path: '**', component: NotFoundComponent }
```

**Important** : toujours la mettre en dernier !

## 4) Lien avec le code du projet

- **app.routes.ts** : définit toutes les routes de l'application
- **RouterLink** : directive pour les liens de navigation
- **ActivatedRoute** : service pour lire les paramètres d'URL (`id`)
- **Router** : service pour naviguer programmatiquement
- **Guards** : fonctions qui retournent `true` (autoriser) ou `false` (bloquer)

## 5) Étapes de la démo formateur (recette)

### Démo A - Configurer les routes de base

1. Ouvrir `app.routes.ts` (tableau vide)
2. Migrer la logique de `app.ts` vers `HomeComponent` (créer les signals, méthodes)
3. Définir les routes :
   - `{ path: '', redirectTo: '/home', pathMatch: 'full' }`
   - `{ path: 'home', component: HomeComponent }`
   - `{ path: '**', loadComponent: () => import('./pages/not-found/...') }`
4. Dans `app.template.html`, remplacer le contenu par `<router-outlet />`
5. **La navbar reste en place** avec ses liens visuels

### Démo B - Compléter la page de détail avec route paramétrée

1. Ouvrir `src/app/pages/game-detail/game-detail.component.ts` (classe vide)
2. **Le template HTML est déjà complet** avec toute la mise en page
3. Ajouter la route : `{ path: 'game/:id', loadComponent: () => import('...') }`
4. Injecter `ActivatedRoute` : `private route = inject(ActivatedRoute)`
5. Récupérer l'ID : `gameId = signal(this.route.snapshot.params['id'])`
6. Charger le jeu : `game = toSignal(this.gameService.getGameById(this.gameId()))`
7. Dans le template, remplacer les données statiques par `game()?.titre`, etc.

### Démo C - Implémenter le lazy loading et les guards

1. Convertir les routes en lazy loading avec `loadComponent`
2. Créer un guard : `pnpm ng generate guard core/guards/auth`
3. Implémenter la logique : retourner `true` si connecté, sinon rediriger vers `/login`
4. Ajouter le guard à la route favoris : `canActivate: [authGuard]`
5. Tester en essayant d'accéder à `/favorites` sans être connecté

## 6) Énoncé de l'exercice étudiant (version 2)

**Objectif** : Compléter la page Wishlist avec protection par guard

**Point de départ** :

- ✅ `WishlistComponent` existe avec son template HTML complet
- ✅ Le lien "Ma Wishlist" existe déjà dans la navbar
- ❌ Aucune logique dans le composant
- ❌ `authGuard` existe mais retourne toujours `true`
- 📝 Des TODO indiquent où ajouter le code

Contraintes :

- Ajouter la route : `{ path: 'wishlist', loadComponent: ..., canActivate: [authGuard] }`
- Dans WishlistComponent, injecter GameService et récupérer les favoris
- Compléter `authGuard` pour vérifier `authService.isAuthenticated()`
- Si non connecté, rediriger vers `/login`
- Dans la navbar, ajouter `routerLink="/wishlist"` sur le lien existant

Résultat attendu dans le navigateur :

- Le lien "Ma Wishlist" est visible dans la navbar
- Cliquer dessus charge la page wishlist (si connecté)
- Si non connecté, redirection vers `/login`
- L'URL change correctement (`/wishlist`)
- L'URL change correctement (`/favorites`)
- Le bouton "retour" du navigateur fonctionne

Indices :

- Utiliser `inject(Router)` pour la navigation programmatique
- Le guard est une simple fonction qui retourne `boolean | UrlTree`
- Utiliser `router.createUrlTree(['/home'])` pour rediriger

## 7) Questions d'auto-évaluation

- Quelle différence entre une route normale et une route paramétrée ?
- Pourquoi mettre la route `**` en dernier ?
- Quelle différence entre `routerLink` et `router.navigate()` ?
- Qu'est-ce que le lazy loading et quel est son avantage ?
- À quoi sert un guard et quand l'utiliser ?
- Comment récupérer un paramètre d'URL dans un composant ?

## 8) Pistes d'extension (bonus)

- Ajouter un guard `canDeactivate` pour confirmer avant de quitter une page
- Créer un resolver pour précharger les données avant d'afficher la page
- Implémenter une route avec plusieurs paramètres (`/games/:genre/:year`)
- Ajouter des animations de transition entre les routes
- Créer une breadcrumb (fil d'Ariane) basée sur les routes actives
