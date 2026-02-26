# Demos formateur - Seance 5

## Sous-concept 1 - Creer le formulaire login reactif

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

## Sous-concept 2 - Implementer AuthService

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

## Sous-concept 3 - Ajouter l'interceptor HTTP

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
