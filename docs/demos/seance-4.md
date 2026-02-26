# Demos formateur - Seance 4

## Sous-concept 1 - Creer les pages standalone

Dossiers/fichiers a creer:

- `src/app/pages/home/*`
- `src/app/pages/game-detail/*`
- `src/app/pages/wishlist/*`
- `src/app/pages/not-found/*`

Rappel de code a fournir (exemple Home):

```ts
@Component({
  selector: 'app-home-page',
  // OnPush: la page se met a jour quand ses entrees/signaux changent.
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Imports locaux: en standalone, on declare ici les composants utilises.
  imports: [GameSectionComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {}
```

## Sous-concept 2 - Configurer le routing lazy

Fichiers a modifier:

- `src/app/app.routes.ts`
- `src/app/app.template.html`

Rappels de code a fournir:

```ts
export const routes: Routes = [
  // Redirection de la racine vers la page principale.
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // loadComponent: lazy loading (la page est chargee seulement quand necessaire).
  { path: 'home', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage) },
  // :id = parametre dynamique dans l'URL pour afficher un jeu cible.
  {
    path: 'game/:id',
    loadComponent: () =>
      import('./pages/game-detail/game-detail.page').then((m) => m.GameDetailPage),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/wishlist/wishlist.page').then((m) => m.WishlistPage),
  },
  // Route wildcard: doit rester en dernier pour capter les URLs inconnues.
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
];
```

```html
<!-- Point d'ancrage ou le Router insere le composant associe a la route active -->
<router-outlet />
```

## Sous-concept 3 - Ajouter le guard

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
