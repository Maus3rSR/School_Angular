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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage) },
  { path: 'game/:id', loadComponent: () => import('./pages/game-detail/game-detail.page').then((m) => m.GameDetailPage) },
  { path: 'wishlist', loadComponent: () => import('./pages/wishlist/wishlist.page').then((m) => m.WishlistPage) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage) },
];
```

```html
<router-outlet />
```

## Sous-concept 3 - Ajouter le guard

Dossiers/fichiers a creer:
- `src/app/guards/auth.guard.ts`

Rappel de code a fournir:
```ts
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
```
