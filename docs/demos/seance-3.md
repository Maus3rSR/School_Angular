# Demos formateur - Seance 3

Objectif de la seance: passer d'une app monolithique a une navigation de base (detail + 404), puis poser un state partage via service/signals.

## Sous-concept 1 - Creer les pages Detail et 404 (version statique)

Implementation pas a pas (ordre conseille):

1. Creer `src/pages/game-detail/` et `src/pages/not-found/`.
2. Coller un template statique pour aller vite (sans binding Angular).
3. Coller le CSS final pour garder un rendu motivant en cours.

Fichiers a creer:

- `src/pages/game-detail/game-detail.page.html`
- `src/pages/game-detail/game-detail.page.css`
- `src/pages/not-found/not-found.page.html`
- `src/pages/not-found/not-found.page.css`

Rappel pedagogique:

- Les snippets statiques sont centralises dans `docs/seance-3.md`, section 9.
- Les donnees doivent suivre le schema `Game` (id, title, year, platforms, rating, category, description, available, hero, playtime, coverImage, backdropImage).

Code HTML/CSS a copier-coller (version statique):

```html
<!-- src/pages/game-detail/game-detail.page.html -->
<section class="wish-detail">
  <figure class="wish-detail__backdrop">
    <img
      src="https://via.assets.so/game.png?id=42&q=95&w=1600&h=900&fit=cover"
      alt="Image de couverture de Cyber Nexus 2077"
      width="1600"
      height="900"
    />
  </figure>

  <div class="wish-detail__veil" aria-hidden="true"></div>

  <div class="wish-detail__content">
    <a class="btn btn-ghost btn-sm" href="/">Retour au catalogue</a>

    <p class="wish-detail__kicker">Fiche jeu</p>
    <h1 class="wish-detail__title">Cyber Nexus 2077</h1>

    <div class="wish-detail__meta">
      <span class="badge badge-primary">Action RPG</span>
      <span class="badge badge-outline">2023</span>
      <span class="badge badge-ghost">PC, PS5, Xbox</span>
    </div>

    <p class="wish-detail__description">
      Explore une megalopole futuriste, fais des choix narratifs forts et enchaine des combats
      dynamiques.
    </p>

    <ul class="wish-detail__facts" aria-label="Informations sur le jeu">
      <li><strong>Note:</strong> 4.7/5</li>
      <li><strong>Duree:</strong> 42h</li>
      <li><strong>Etat:</strong> Disponible</li>
    </ul>

    <div class="wish-detail__actions">
      <button type="button" class="btn btn-secondary">Ajouter a la wishlist</button>
      <a class="btn btn-outline" href="/wishlist">Voir ma wishlist</a>
    </div>
  </div>
</section>

<section class="wish-detail__missing">
  <h1>Jeu introuvable</h1>
  <p>Ce jeu n existe pas dans le catalogue.</p>
  <a class="btn btn-primary" href="/">Retour a l accueil</a>
</section>
```

```css
/* src/pages/game-detail/game-detail.page.css */
.wish-detail {
  position: relative;
  min-height: 70svh;
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 8%);
}

.wish-detail__backdrop {
  margin: 0;
  position: absolute;
  inset: 0;
}

.wish-detail__backdrop img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wish-detail__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgb(8 9 14 / 95%) 0%, rgb(8 9 14 / 70%) 50%, rgb(8 9 14 / 30%) 100%),
    linear-gradient(180deg, rgb(8 9 14 / 20%) 0%, rgb(8 9 14 / 95%) 100%);
}

.wish-detail__content {
  position: relative;
  z-index: 1;
  max-width: 58ch;
  padding: clamp(1.25rem, 3vw, 2.5rem);
}

.wish-detail__kicker {
  margin: 1rem 0 0;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgb(255 255 255 / 70%);
}

.wish-detail__title {
  margin: 0.5rem 0 0;
  font-size: clamp(1.8rem, 5vw, 3.2rem);
}

.wish-detail__meta {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.wish-detail__description {
  margin-top: 1rem;
  line-height: 1.6;
}

.wish-detail__facts {
  margin-top: 1rem;
  padding-left: 1rem;
  display: grid;
  gap: 0.35rem;
}

.wish-detail__actions {
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.wish-detail__missing {
  margin-top: 1.25rem;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid rgb(255 255 255 / 10%);
  background: rgb(12 15 24 / 75%);
}
```

```html
<!-- src/pages/not-found/not-found.page.html -->
<section class="wish-not-found" aria-labelledby="not-found-title">
  <h1 id="not-found-title">404</h1>
  <p>Oups, cette page n existe pas.</p>
  <a class="btn btn-primary" href="/">Retourner au catalogue</a>
</section>
```

```css
/* src/pages/not-found/not-found.page.css */
.wish-not-found {
  min-height: 60svh;
  display: grid;
  place-content: center;
  gap: 0.75rem;
  justify-items: center;
  text-align: center;
}

.wish-not-found h1 {
  margin: 0;
  font-size: clamp(3rem, 14vw, 8rem);
  line-height: 1;
}
```

Check rapide navigateur:

- Le style detail ressemble au rendu cible, meme sans logique dynamique.
- `/url-inconnue` doit afficher la page 404.

## Sous-concept 2 - Configurer router-outlet et routes de base

Implementation pas a pas (ordre conseille):

1. Ajouter `<router-outlet />` dans `app.template.html`.
2. Declarer les routes `''`, `games/:id` et `**`.
3. Verifier que la wildcard est bien en dernier.

Fichiers a modifier:

- `src/app/app.template.html`
- `src/app/app.routes.ts`

Rappel de code a fournir:

```ts
import { Routes } from '@angular/router';

import { GameDetailPage } from '../pages/game-detail/game-detail.page';
import { HomePage } from '../pages/home/home.page';
import { NotFoundPage } from '../pages/not-found/not-found.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'games/:id', component: GameDetailPage },
  { path: '**', component: NotFoundPage },
];
```

```html
<main class="wishflix-main" id="contenu-principal">
  <router-outlet />
</main>
```

Check rapide navigateur:

- `/` affiche la home.
- `/games/42` affiche la page detail.
- une URL inconnue affiche la 404.

## Sous-concept 3 - Externaliser le state local dans un service signals

Implementation pas a pas (ordre conseille):

1. Creer `GameCatalogService` avec un tableau local de jeux.
2. Stocker ce tableau dans un `signal<Game[]>`.
3. Exposer des lectures derivees (`heroGame`, `gameById`) via `computed`/methodes.
4. Injecter le service dans Home et Detail.

Fichiers a creer/modifier:

- `src/features/game/game-catalog.service.ts`
- `src/pages/home/home.page.ts`
- `src/pages/game-detail/game-detail.page.ts`

Rappels de code a fournir:

```ts
@Injectable({ providedIn: 'root' })
export class GameCatalogService {
  private readonly gamesState = signal<Game[]>(MOCK_GAMES);
  readonly games = this.gamesState.asReadonly();

  readonly heroGame = computed(() => this.gamesState().find((game) => game.hero) ?? null);

  gameById(id: number): Game | undefined {
    return this.gamesState().find((game) => game.id === id);
  }
}
```

Check rapide navigateur:

- Home et Detail lisent bien la meme source de verite.
- Aucune logique metier n'est dupliquee entre composants.
