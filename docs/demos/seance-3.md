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
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games`);
  }
}
```

```ts
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
private readonly gameService = inject(GameService);
protected readonly games = toSignal(this.gameService.getGames(), { initialValue: [] });
```

## Sous-concept 3 - Gerer loading et erreurs

Fichiers a modifier:
- `src/app/app.ts`
- `src/app/app.template.html`

Rappels de code a fournir:
```ts
protected readonly isLoading = signal(true);
protected readonly errorMessage = signal<string | null>(null);
```

```html
@if (isLoading()) { <p class="alert alert-info">Chargement...</p> }
@if (errorMessage()) { <p class="alert alert-error">{{ errorMessage() }}</p> }
```
