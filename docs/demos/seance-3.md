# Demos formateur - Seance 3

## Sous-concept 1 - Creer GameService et HttpClient

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

## Sous-concept 2 - Consommer l'API dans App

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

## Sous-concept 3 - Gerer loading et erreurs

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
