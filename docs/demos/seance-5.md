# Demos formateur - Seance 5

## Sous-concept 1 - Creer le formulaire login reactif

Implementation pas a pas (ordre conseille):

1. Creer `LoginPage` avec imports `ReactiveFormsModule`.
2. Declarer le `FormGroup` (`email`, `password`) avec validators.
3. Brancher `[formGroup]` et `(ngSubmit)` dans le template.
4. Afficher les messages d'erreur de validation avec `@if`.

Dossiers/fichiers a creer:

- `src/app/pages/login/*`

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
4. Ajouter un etat local `authenticated` et une methode `isAuthenticated()`.

Dossiers/fichiers a creer:

- `src/app/services/auth.service.ts`

Rappels de code a fournir:

```ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  // inject() evite le constructeur et garde un service facilement testable.
  private readonly http = inject(HttpClient);
  // Signal local: etat synchrone/reactif sans abonnement manuel.
  private readonly authenticated = signal(false);

  isAuthenticated(): boolean {
    return this.authenticated();
  }

  login(email: string, password: string): Observable<{ token: string }> {
    // Reponse typee: le token est verifie par TypeScript avant usage (guard/interceptor).
    return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, {
      email,
      password,
    });
  }
}
```

Check rapide navigateur:

- Un login succes met a jour l'etat d'auth et permet l'acces aux routes protegees.
- Un login invalide n'active pas l'etat authentifie.

## Sous-concept 3 - Ajouter l'interceptor HTTP

Implementation pas a pas (ordre conseille):

1. Creer `authInterceptor` en `HttpInterceptorFn`.
2. Lire le token depuis le stockage local.
3. Si token absent: passer la requete sans modification.
4. Si token present: cloner la requete et injecter `Authorization`.
5. Enregistrer l'interceptor dans `app.config.ts`.

Dossiers/fichiers a creer:

- `src/app/interceptors/auth.interceptor.ts`

Fichiers a modifier:

- `src/app/app.config.ts`

Rappels de code a fournir:

```ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Lecture du token stocke localement apres connexion.
  const token = localStorage.getItem('token');
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

- Requete API apres login: header `Authorization` present (verifiable onglet Network).
- Sans token: les requetes sortent sans header ajoute.
