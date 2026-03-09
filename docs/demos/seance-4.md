# Demos formateur - Seance 4

Objectif de la seance: passer d'un catalogue local a un catalogue charge en HTTP, avec URL differente selon l'environnement dev/prod.

## Sous-concept 1 - Brancher HttpClient dans l'application

Implementation pas a pas (ordre conseille):

1. Ajouter `provideHttpClient()` dans `app.config.ts`.
2. Verifier que l'application compile apres ajout du provider.

Fichiers a modifier:

- `src/app/app.config.ts`

Rappel de code a fournir:

```ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient(), provideRouter(routes)],
};
```

Check rapide navigateur:

- Plus d'erreur d'injection liee a `HttpClient`.

## Sous-concept 2 - Charger le catalogue depuis HTTP

Implementation pas a pas (ordre conseille):

1. Injecter `HttpClient` dans `GameCatalogService` via `inject()`.
2. Appeler l'endpoint catalogue via `environment.apiUrl`.
3. Alimenter le signal `gamesState` avec la reponse.

Fichiers a modifier:

- `src/features/game/game-catalog.service.ts`

Rappels de code a fournir:

```ts
private readonly http = inject(HttpClient);

loadGames(): void {
  this.loadingState.set(true);
  this.errorState.set(null);

  this.http.get<Game[]>(`${environment.apiUrl}/games`).subscribe({
    next: (games) => {
      this.gamesState.set(games);
      this.loadingState.set(false);
    },
    error: () => {
      this.gamesState.set([]);
      this.errorState.set('Le catalogue est indisponible pour le moment.');
      this.loadingState.set(false);
    },
  });
}
```

```html
<!-- src/pages/home/home.page.html (extrait) -->
@if (isLoading()) {
<p class="alert alert-info">Chargement du catalogue...</p>
} @if (loadingError()) {
<p class="alert alert-error">{{ loadingError() }}</p>
} @if (!isLoading() && !loadingError()) {
<section class="wishflix-catalogue">
  <div class="wishflix-catalogue__grid">
    @for (game of filteredGames(); track game.id) {
    <article class="card game-card">
      <h3 class="game-card__title">{{ game.title }}</h3>
    </article>
    }
  </div>
</section>
}
```

```css
/* src/pages/home/home.page.css (extrait) */
.wishflix-catalogue__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
}

.game-card {
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 0.75rem;
  padding: 1rem;
}

.game-card__title {
  margin: 0;
  font-size: 1rem;
}
```

Check rapide navigateur:

- Le catalogue s'affiche a partir des donnees HTTP.

## Sous-concept 3 - Configurer les environnements dev/prod

Implementation pas a pas (ordre conseille):

1. Mettre une URL locale dans `environment.development.ts` (ex: JSON mock).
2. Mettre l'URL cible dans `environment.ts` (prod).
3. Expliquer que les fichiers d'environnement sont versionnes, sans secrets.

Fichiers a modifier:

- `src/environments/environment.development.ts`
- `src/environments/environment.ts`

Rappels de code a fournir:

```ts
// environment.development.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
};
```

```ts
// environment.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.wishflix.com',
};
```

Check rapide navigateur:

- En dev, l'app interroge la base locale/mock.
- En build prod, l'app utilise l'URL de production.
