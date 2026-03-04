# Demos formateur - Seance 4

Objectif de la seance: passer d'une home monolithique a une app multi-pages avec routing lazy et protection de route.

## Sous-concept 1 - Creer les pages standalone

Implementation pas a pas (ordre conseille):

1. Creer les 4 pages (`home`, `game-detail`, `wishlist`, `not-found`).
2. Mettre un template minimal par page pour valider l'affichage de chaque route.
3. Importer uniquement les composants/directives necessaires dans chaque page.
4. Ajouter la logique metier plus tard (apres validation du routing).

Dossiers/fichiers a creer:

- `src/app/pages/home/*`
- `src/app/pages/game-detail/*`
- `src/app/pages/wishlist/*`
- `src/app/pages/not-found/*`

Rappel de code a fournir (exemple Home):

```ts
@Component({
  selector: 'app-home-page',
  // Imports locaux: en standalone, on declare ici les composants utilises.
  imports: [GameSectionComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {}
```

Check rapide navigateur:

- Si tu charges directement le composant dans une route de test, la page doit s'afficher sans erreur d'import.

## Sous-concept 2 - Configurer le routing lazy

Implementation pas a pas (ordre conseille):

1. Declarer la redirection `'' -> /home`.
2. Ajouter les routes metier (`home`, `game/:id`, `wishlist`).
3. Ajouter la wildcard `**` en dernier.
4. Remplacer le contenu central de `app.template.html` par `<router-outlet />`.

Fichiers a modifier:

- `src/app/app.routes.ts`
- `src/app/app.template.html`

Rappels de code a fournir:

```ts
import { Routes } from '@angular/router';
import { GameDetailPage } from './pages/game-detail/game-detail.page';
import { HomePage } from './pages/home/home.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { WishlistPage } from './pages/wishlist/wishlist.page';

export const routes: Routes = [
  // Redirection de la racine vers la page principale.
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  // :id = parametre dynamique dans l'URL pour afficher un jeu cible.
  { path: 'game/:id', component: GameDetailPage },
  { path: 'wishlist', component: WishlistPage },
  // Route wildcard: doit rester en dernier pour capter les URLs inconnues.
  { path: '**', component: NotFoundPage },
];
```

```html
<!-- Point d'ancrage ou le Router insere le composant associe a la route active -->
<router-outlet />
```

Check rapide navigateur:

- `/home` affiche la home.
- `/game/1` affiche la page detail.
- une URL inconnue affiche la 404.

## Sous-concept 3 - Ajouter le guard

Implementation pas a pas (ordre conseille):

1. Creer `authGuard` dans `src/app/guards/auth.guard.ts`.
2. Injecter `AuthService` et `Router` via `inject()`.
3. Retourner `true` si authentifie, sinon `UrlTree` vers `/login`.
4. Brancher le guard sur la route `wishlist` dans `app.routes.ts`.

Dossiers/fichiers a creer:

- `src/app/guards/auth.guard.ts`

Rappel de code a fournir:

```ts
export const authGuard: CanActivateFn = () => {
  // Un guard fonctionnel utilise inject() pour acceder aux services.
  const authService = inject(AuthService);
  const router = inject(Router);
  // Si non connecte, on renvoie une UrlTree vers /login (redirection propre).
  return authService.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
```

Check rapide navigateur:

- Non connecte: acces `/wishlist` redirige vers `/login`.
- Connecte: acces `/wishlist` autorise.
