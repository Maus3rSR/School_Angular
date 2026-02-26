# Séance 3 sur 5 - Services et HTTP

## 1) Objectifs pédagogiques

- Comprendre le rôle des services et l'injection de dépendances avec `inject()`
- Consommer une API REST avec **HttpClient** (GET, POST, PUT, DELETE)
- Maîtriser les **Observables** : subscribe, async pipe, `toSignal()`
- Gérer les erreurs HTTP et les états de chargement
- Utiliser les environnements (dev/prod) pour les URLs d'API

## 2) Prérequis concrets

- Avoir terminé la séance 2 (composants GameCard et GameSection avec input/output)
- Fichiers à ouvrir :
  - `src/app/services/game.service.ts` (structure vide à compléter)
  - `src/app/app.ts` (pour injecter le service)
  - `src/environments/` (fichiers à créer)
- **État initial** :
  - ✅ GameService existe avec la structure de classe et les signatures de méthodes
  - ❌ Aucun appel HTTP implémenté, méthodes vides avec TODO
  - ❌ HttpClient pas encore configuré dans app.config.ts
  - 📝 Des TODO indiquent où ajouter les appels HTTP

## 3) Explication théorique vulgarisée (contexte WishFlix)

### Pourquoi un service ?

Actuellement, les jeux sont définis directement dans le composant. Problèmes :

- Duplication si plusieurs composants ont besoin du catalogue
- Impossible de récupérer les données depuis une vraie API
- Difficile à tester

Un **service** centralise la logique métier et les appels API. Il devient la "source de vérité" du catalogue.

### Injection de dépendances moderne

Au lieu de `constructor(private service: GameService)`, on utilise maintenant :

```typescript
gameService = inject(GameService);
```

Plus concis, plus moderne, compatible avec les fonctions.

### HttpClient : communiquer avec une API

**HttpClient** est le module Angular pour faire des requêtes HTTP. Il retourne des **Observables** (flux de données asynchrones).

Méthodes principales :

- `http.get<Game[]>(url)` : récupérer des données
- `http.post<Game>(url, data)` : créer une ressource
- `http.put<Game>(url, data)` : modifier une ressource
- `http.delete(url)` : supprimer une ressource

### Observables vs Signals

Un **Observable** est un flux de données dans le temps. Pour l'utiliser dans un template :

- **Méthode 1** : `subscribe()` manuellement (à éviter, gestion manuelle du unsubscribe)
- **Méthode 2** : `async` pipe dans le template (Angular gère le unsubscribe)
- **Méthode 3** : `toSignal()` pour convertir en Signal (recommandé avec les Signals)

### Gestion d'erreurs

Les API peuvent échouer (réseau, serveur). Il faut gérer ces cas avec :

- `catchError()` pour intercepter les erreurs
- Un signal `isLoading` pour afficher un spinner
- Un signal `error` pour afficher un message utilisateur

## 4) Lien avec le code du projet

- **GameService** : contient `getGames()`, `getGameById()`, `addToFavorites()`, etc.
- **HttpClient** : injecté dans le service avec `inject(HttpClient)`
- **environment** : contient `apiUrl` différent selon dev/prod
- **HomeComponent** : utilise `toSignal()` pour convertir l'Observable en Signal

## 5) Étapes de la démo formateur (recette)

### Démo A - Configurer HttpClient et compléter le service

1. Ouvrir `src/app/services/game.service.ts` (déjà créé avec structure vide)
2. Dans `app.config.ts`, ajouter `provideHttpClient()` dans les providers
3. Dans le service, injecter HttpClient : `private http = inject(HttpClient)`
4. Compléter la méthode `getGames()` qui retourne `Observable<Game[]>`
5. Implémenter l'appel : `return this.http.get<Game[]>(`${environment.apiUrl}/games`)`

### Démo B - Consommer l'API avec toSignal()

1. Créer `src/environments/environment.development.ts` avec `apiUrl: 'http://localhost:3000'`
2. Créer `src/environments/environment.ts` avec `apiUrl: 'https://api.wishflix.com'`
3. Dans `app.ts`, injecter le service : `private gameService = inject(GameService)`
4. Remplacer le signal statique par : `games = toSignal(this.gameService.getGames(), { initialValue: [] })`
5. **Le template reste inchangé**, il utilise déjà `games()`
6. Tester avec une API mock (json-server ou API fournie)

### Démo C - Gérer les états de chargement et erreurs

1. Créer des signals : `isLoading = signal(true)` et `error = signal<string | null>(null)`
2. Utiliser `pipe()` avec `catchError()` pour gérer les erreurs
3. Dans le template, utiliser `@if (isLoading())` pour afficher un spinner
4. Utiliser `@if (error())` pour afficher un message d'erreur
5. Tester en coupant le serveur pour voir l'erreur

## 6) Énoncé de l'exercice étudiant (version 2)

**Objectif** : Implémenter la gestion des favoris côté API

**Point de départ** :

- ✅ La méthode `toggleFavorite(gameId: number)` existe dans GameService (vide)
- ❌ Aucun appel HTTP implémenté
- 📝 Un TODO indique où ajouter le code

Contraintes :

- Compléter `toggleFavorite(gameId: number): Observable<void>`
- Utiliser `http.post<void>(`${environment.apiUrl}/favorites/${gameId}`, {})`
- Dans `app.ts`, appeler le service au lieu de modifier directement le signal
- Gérer les erreurs avec `catchError()` et afficher un message
- Utiliser `tap()` pour mettre à jour le signal local après succès

Résultat attendu dans le navigateur :

- Cliquer sur le cœur appelle l'API
- Le favori est persisté côté serveur
- L'icône se met à jour après confirmation du serveur

Indices :

- Utiliser `tap()` pour mettre à jour le signal après succès
- Utiliser `catchError()` pour gérer les erreurs sans casser le flux
- Penser à `subscribe()` pour déclencher la requête HTTP

## 7) Questions d'auto-évaluation

- Quelle différence entre un service et un composant ?
- Pourquoi utiliser `inject()` plutôt que le constructor ?
- Qu'est-ce qu'un Observable et comment le consommer ?
- Quelle différence entre `subscribe()`, `async` pipe et `toSignal()` ?
- Pourquoi gérer les erreurs HTTP ?
- À quoi servent les fichiers `environment.ts` ?

## 8) Pistes d'extension (bonus)

- Ajouter un cache simple dans le service (éviter de rappeler l'API)
- Implémenter une recherche côté serveur avec `http.get('/games?search=...')`
- Créer un interceptor pour logger toutes les requêtes HTTP
- Ajouter un retry automatique en cas d'erreur réseau avec `retry()`
