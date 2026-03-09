# Séance 3 sur 5 - Routing fondamental et etat partage

## 1) Objectifs pédagogiques

- Mettre en place `router-outlet` et les premieres routes (`/`, `games/:id`, `**`).
- Creer une page detail simple et une page 404.
- Comprendre pourquoi sortir l'etat des composants vers un service avec `signal()`.

## 2) Prérequis concrets

- Avoir termine la seance 2.
- Etat de depart: application monolithique dans `App`.
- Pas encore de routes metier, pas de pages dediees, pas de service de state.

## 3) Explication theorique vulgarisee (contexte WishFlix)

Cette seance transforme WishFlix en vraie mini-SPA: l'URL pilote l'ecran (`detail`, `404`) via `router-outlet`. En parallele, on introduit un service de state avec signaux pour eviter de dupliquer la logique entre Home et Detail.

## 4) Lien avec le code du projet

- `src/app/app.template.html`: insertion de `<router-outlet />`.
- `src/app/app.routes.ts`: routes de base (`''`, `games/:id`, `**`).
- `src/pages/game-detail/` et `src/pages/not-found/`: ecrans detail et 404.
- `src/features/game/game-catalog.service.ts`: state partage avec `signal()` et `computed()`.

## 5) Liste des sous-concepts

1. Brancher `router-outlet` et declarer les routes de navigation.
2. Creer la page detail et la page 404 (version statique pour avancer vite).
3. Externaliser le state du catalogue dans un service avec signaux (sans HTTP).

## 6) Liens vers les demos formateur

- Demos formateur: dossier `docs/demos/`.

## 7) Liens vers les exercices etudiants

- Exercices etudiants: dossier `docs/exercices/`.

## 8) Pistes d'extension (bonus)

- Ajouter une redirection explicite de `''` vers `/home`.
- Ajouter une route `wishlist` (sans guard pour l'instant).
- Faire evoluer la page detail de statique vers dynamique a partir de l'id d'URL.

## 9) Snippets prêts à copier-coller (version statique pour la séance)

Objectif: garder un rendu visuel proche du final, mais sans binding Angular, pour avancer vite en classe.

### 9.1 Donnée statique alignée sur le schéma `Game`

```ts
type GameCategory =
  | 'Action RPG'
  | 'Action'
  | 'Strategie'
  | 'Aventure'
  | 'Independant'
  | 'Multijoueur';

type Game = {
  id: number;
  title: string;
  year: number;
  platforms: string[];
  rating: number;
  category: GameCategory;
  description: string;
  available: boolean;
  hero: boolean;
  playtime: string;
  coverImage: string;
  backdropImage: string;
};

const demoGame: Game = {
  id: 42,
  title: 'Cyber Nexus 2077',
  year: 2023,
  platforms: ['PC', 'PS5', 'Xbox'],
  rating: 4.7,
  category: 'Action RPG',
  description:
    'Explore une megalopole futuriste, fais des choix narratifs forts et enchaine des combats dynamiques.',
  available: true,
  hero: true,
  playtime: '42h',
  coverImage: 'https://via.assets.so/game.png?id=42&q=95&w=300&h=450&fit=cover',
  backdropImage: 'https://via.assets.so/game.png?id=42&q=95&w=1600&h=900&fit=cover',
};
```

### 9.2 `game-detail.page.html` (sans binding Angular)

```html
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
  <p>Ce jeu n existe pas dans le catalogue local.</p>
  <a class="btn btn-primary" href="/">Retour a l accueil</a>
</section>
```

### 9.3 `game-detail.page.css`

```css
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

### 9.4 `not-found.page.html` (sans binding Angular)

```html
<section class="wish-not-found" aria-labelledby="not-found-title">
  <h1 id="not-found-title">404</h1>
  <p>Oups, cette page n existe pas.</p>
  <a class="btn btn-primary" href="/">Retourner au catalogue</a>
</section>
```

### 9.5 `not-found.page.css`

```css
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
