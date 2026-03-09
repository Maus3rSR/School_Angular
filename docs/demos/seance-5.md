# Demos formateur - Seance 5

Objectif de la seance: ajouter l'authentification sur la base du routing et du HTTP deja en place (login, session, guard, interceptor).

## Sous-concept 1 - Creer le formulaire login reactif

Implementation pas a pas (ordre conseille):

1. Creer `LoginPage` avec imports `ReactiveFormsModule`.
2. Declarer le `FormGroup` (`email`, `password`) avec validators.
3. Brancher `[formGroup]` et `(ngSubmit)` dans le template.
4. Afficher les messages d'erreur de validation avec `@if`.

Dossiers/fichiers a creer:

- `src/pages/login/*`

Rappels de code a fournir:

```ts
// FormGroup = objet racine du formulaire reactif.
protected readonly loginForm = new FormGroup({
  // nonNullable evite les valeurs null et simplifie les types TypeScript.
  email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  // Validators: required + longueur minimale pour le mot de passe.
  password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
});
```

```html
<!-- [formGroup] branche les validations reactives et ngSubmit centralise la soumission -->
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">...</form>
```

Check rapide navigateur:

- Le bouton submit est bloque tant que le formulaire est invalide.
- Les erreurs `required/email/minLength` deviennent visibles apres interaction.

## Sous-concept 2 - Implementer AuthService

Implementation pas a pas (ordre conseille):

1. Creer `AuthService` en `providedIn: 'root'`.
2. Injecter `HttpClient` avec `inject()`.
3. Ajouter `login(email, password)` type en `Observable<{ token: string }>`.
4. Stocker l'etat de session (token + authentification) dans des signaux.

Dossiers/fichiers a creer:

- `src/features/auth/auth.service.ts`

Rappels de code a fournir:

```ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  // inject() evite le constructeur et garde un service facilement testable.
  private readonly http = inject(HttpClient);
  // Signals locaux: source de verite de la session utilisateur.
  private readonly tokenState = signal<string | null>(null);
  private readonly authenticated = signal(false);

  isAuthenticated(): boolean {
    return this.authenticated();
  }

  token(): string | null {
    return this.tokenState();
  }

  login(email: string, password: string): Observable<{ token: string }> {
    // Reponse typee: le token est verifie par TypeScript avant usage (guard/interceptor).
    return this.http
      .post<{ token: string }>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((session) => {
          this.tokenState.set(session.token);
          this.authenticated.set(true);
        }),
      );
  }
}
```

Check rapide navigateur:

- Un login succes met a jour l'etat d'auth et permet l'acces aux routes protegees.
- Un login invalide n'active pas l'etat authentifie.

## Sous-concept 3 - Finaliser la securite avec guard + interceptor

Implementation pas a pas (ordre conseille):

1. Creer `authGuard` et bloquer `/wishlist` si non connecte.
2. Creer `authInterceptor` en `HttpInterceptorFn`.
3. Lire le token depuis `AuthService`.
4. Si token absent: passer la requete sans modification.
5. Si token present: cloner la requete et injecter `Authorization`.
6. Enregistrer l'interceptor dans `app.config.ts`.

Dossiers/fichiers a creer:

- `src/features/auth/auth.guard.ts`
- `src/features/auth/api/auth-token.interceptor.ts`

Fichiers a modifier:

- `src/app/app.routes.ts`
- `src/app/app.config.ts`

Rappel de code a fournir (guard):

```ts
export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated()
    ? true
    : router.createUrlTree(['/login'], { queryParams: { redirectTo: state.url } });
};
```

Rappels de code a fournir:

```ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();
  // Sans token: on transmet la requete telle quelle.
  if (!token) return next(req);
  // Avec token: on clone la requete et on ajoute Authorization.
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
```

```ts
// Branche l'interceptor globalement sur toutes les requetes HttpClient.
provideHttpClient(withInterceptors([authInterceptor]));
```

Check rapide navigateur:

- Route `/wishlist`: redirection vers `/login` si non connecte.
- Requete API apres login: header `Authorization` present (verifiable onglet Network).
- Sans token: les requetes sortent sans header ajoute.
