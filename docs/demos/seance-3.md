# Demos formateur - Seance 3

## Sous-concept 1 - Creer GameService et HttpClient

Implementation pas a pas (ordre conseille):

1. Creer l'interface/type `Game` dans `src/app/models/game.model.ts`.
2. Creer `GameService` avec `providedIn: 'root'`.
3. Injecter `HttpClient` via `inject()`.
4. Ajouter `getGames()` typee en `Observable<Game[]>`.
5. Activer `provideHttpClient()` dans `app.config.ts`.

Dossiers/fichiers a creer:

- `src/app/services/game.service.ts`
- `src/app/models/game.model.ts`

Fichiers a modifier:

- `src/app/app.config.ts`

Rappels de code a fournir:

```ts
@Injectable({ providedIn: 'root' })
export class GameService {
  // inject() remplace le constructeur pour recuperer HttpClient.
  private readonly http = inject(HttpClient);
  // URL centralisee dans environment pour changer facilement dev/prod.
  private readonly apiUrl = environment.apiUrl;

  getGames(): Observable<Game[]> {
    // Observable: flux asynchrone de la reponse HTTP.
    return this.http.get<Game[]>(`${this.apiUrl}/games`);
  }
}
```

```ts
// provideHttpClient active HttpClient dans toute l'app standalone.
providers: [provideBrowserGlobalErrorListeners(), provideHttpClient(), provideRouter(routes)],
```

Check rapide navigateur:

- L'application compile sans erreur d'injection `HttpClient`.
- Aucun appel API n'est encore visible tant que `GameService` n'est pas consomme dans `App`.

## Sous-concept 2 - Consommer l'API dans App

Implementation pas a pas (ordre conseille):

1. Creer `environment.ts` et `environment.development.ts` avec `apiUrl`.
2. Injecter `GameService` dans `App`.
3. Convertir `getGames()` en signal via `toSignal(..., { initialValue: [] })`.
4. Remplacer les anciennes donnees statiques par ce nouveau signal dans le template.

Fichiers a creer:

- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

Fichiers a modifier:

- `src/app/app.ts`

Rappels de code a fournir:

```ts
// Injection du service metier dans App.
private readonly gameService = inject(GameService);
// toSignal relie Observable (HTTP) -> Signal (template reactif Angular).
protected readonly games = toSignal(this.gameService.getGames(), { initialValue: [] });
```

Check rapide navigateur:

- Au chargement, la grille finit par afficher les donnees API.
- Pas d'erreur TypeScript sur les proprietes `game.title`, `game.rating`, etc.

## Sous-concept 3 - Gerer loading et erreurs

Implementation pas a pas (ordre conseille):

1. Initialiser `isLoading` a `true` et `errorMessage` a `null`.
2. Mettre `isLoading` a `false` quand la reponse API arrive.
3. En cas d'erreur HTTP, alimenter `errorMessage`.
4. Afficher/masquer les messages dans `app.template.html` avec `@if`.

Fichiers a modifier:

- `src/app/app.ts`
- `src/app/app.template.html`

Rappels de code a fournir:

```ts
// true au depart: on affiche l'etat de chargement avant la reponse API.
protected readonly isLoading = signal(true);
// null = pas d'erreur, string = message a afficher dans l'UI.
protected readonly errorMessage = signal<string | null>(null);
```

```html
<!-- @if retire/ajoute reellement le bloc du DOM, ce qui evite des elements inutiles -->
@if (isLoading()) {
<p class="alert alert-info">Chargement...</p>
}
<!-- Gestion simple et visible des erreurs reseau/API -->
@if (errorMessage()) {
<p class="alert alert-error">{{ errorMessage() }}</p>
}
```

Check rapide navigateur:

- Pendant le chargement: message "Chargement..." visible.
- En erreur API: message d'erreur visible.
- En succes: les messages disparaissent et la grille reste visible.
