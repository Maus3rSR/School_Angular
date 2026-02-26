# Demos formateur - Seance 5

## Sous-concept 1 - Creer le formulaire login reactif

Dossiers/fichiers a creer:
- `src/app/pages/login/*`

Rappels de code a fournir:
```ts
protected readonly loginForm = new FormGroup({
  email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
});
```

```html
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">...</form>
```

## Sous-concept 2 - Implementer AuthService

Dossiers/fichiers a creer:
- `src/app/services/auth.service.ts`

Rappels de code a fournir:
```ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authenticated = signal(false);

  isAuthenticated(): boolean {
    return this.authenticated();
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, { email, password });
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
  const token = localStorage.getItem('token');
  if (!token) return next(req);
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
```

```ts
provideHttpClient(withInterceptors([authInterceptor]))
```
