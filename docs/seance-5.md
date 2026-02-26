# Séance 5 sur 5 - Formulaires et authentification

## 1) Objectifs pédagogiques

- Maîtriser les **Reactive Forms** : FormControl, FormGroup, Validators
- Créer des **validations personnalisées** adaptées au métier
- Implémenter l'**authentification** : login, logout, gestion du token
- Utiliser les **HTTP Interceptors** pour ajouter automatiquement le token
- Protéger les routes avec les guards basés sur l'authentification
- Consolider les acquis des 5 séances

## 2) Prérequis concrets

- Avoir terminé la séance 4 (routing et guards)
- Fichiers à ouvrir :
  - `src/app/pages/login/login.component.ts` (structure vide à compléter)
  - `src/app/services/auth.service.ts` (méthodes vides à compléter)
  - `src/app/pages/search/search.component.ts` (structure vide)
- **État initial** :
  - ✅ LoginComponent existe avec son formulaire HTML complet (champs email/password)
  - ✅ SearchComponent existe avec son formulaire HTML complet
  - ❌ Aucun FormGroup/FormControl déclaré
  - ❌ AuthService existe mais login/logout sont vides
  - ❌ Pas d'interceptor créé
  - 📝 Des TODO indiquent où ajouter le code

## 3) Explication théorique vulgarisée (contexte WishFlix)

### Reactive Forms : pourquoi et comment ?

Les **Reactive Forms** offrent un contrôle total sur les formulaires :

- Validation synchrone et asynchrone
- Réactivité aux changements avec RxJS
- Testabilité (logique séparée du template)

Composants principaux :

- **FormControl** : un seul champ (ex: email)
- **FormGroup** : groupe de champs (ex: formulaire de login)
- **Validators** : règles de validation (required, email, minLength, etc.)

### Authentification : le flux complet

1. **Login** : l'utilisateur saisit email/password
2. **API** : vérifie les credentials et retourne un token JWT
3. **Stockage** : le token est sauvegardé (localStorage ou sessionStorage)
4. **Requêtes** : le token est ajouté automatiquement à chaque requête HTTP
5. **Guards** : vérifient le token pour protéger les routes
6. **Logout** : supprime le token et redirige vers login

### HTTP Interceptors

Un **interceptor** intercepte toutes les requêtes HTTP pour :

- Ajouter automatiquement le token dans les headers
- Gérer les erreurs 401 (non autorisé) globalement
- Logger les requêtes pour le debug

C'est comme un "filtre" qui s'applique à toutes les requêtes sans dupliquer le code.

### Validation personnalisée

Angular fournit des validateurs de base, mais on peut créer les nôtres :

```typescript
function passwordStrength(control: AbstractControl) {
  const value = control.value;
  if (!value) return null;
  const hasNumber = /[0-9]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  return hasNumber && hasUpper ? null : { weak: true };
}
```

## 4) Lien avec le code du projet

- **LoginComponent** : formulaire avec email + password
- **AuthService** : gère login(), logout(), isAuthenticated()
- **AuthInterceptor** : ajoute le token aux requêtes
- **authGuard** : vérifie l'authentification avant d'accéder aux routes protégées
- **SearchFormComponent** : recherche de jeux avec validation

## 5) Étapes de la démo formateur (recette)

### Démo A - Compléter le formulaire de login

1. Ouvrir `src/app/pages/login/login.component.ts` (classe vide)
2. **Le template HTML est déjà complet** avec les champs email/password stylés
3. Importer `ReactiveFormsModule` dans le composant
4. Créer le FormGroup :
   ```typescript
   loginForm = new FormGroup({
     email: new FormControl('', [Validators.required, Validators.email]),
     password: new FormControl('', [Validators.required, Validators.minLength(6)]),
   });
   ```
5. Dans le template, ajouter `[formGroup]="loginForm"` sur le `<form>`
6. Ajouter `formControlName="email"` et `formControlName="password"` sur les inputs
7. Ajouter `@if` pour afficher les erreurs de validation

### Démo B - Implémenter AuthService et le login

1. Ouvrir `src/app/services/auth.service.ts` (méthodes vides)
2. Compléter `login(email: string, password: string): Observable<{token: string}>`
3. Implémenter l'appel : `return this.http.post<{token}>(`${environment.apiUrl}/auth/login`, {email, password})`
4. Stocker le token avec `tap()` : `localStorage.setItem('token', response.token)`
5. Mettre à jour le signal : `this.isAuthenticatedSignal.set(true)`
6. Dans LoginComponent, implémenter `onSubmit()` qui appelle le service
7. Rediriger vers `/home` après login réussi

### Démo C - Créer l'interceptor et protéger les routes

1. Créer `src/app/interceptors/auth.interceptor.ts`
2. Implémenter la fonction interceptor :
   ```typescript
   export const authInterceptor: HttpInterceptorFn = (req, next) => {
     const token = localStorage.getItem('token');
     if (token) {
       req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
     }
     return next(req);
   };
   ```
3. Dans `app.config.ts`, ajouter `withInterceptors([authInterceptor])`
4. Compléter `authGuard` pour vérifier le token via AuthService
5. Tester le flux complet : login → wishlist → logout

## 6) Énoncé de l'exercice étudiant (version 2)

**Objectif** : Compléter le formulaire de recherche avec validation

**Point de départ** :

- ✅ SearchComponent existe avec son formulaire HTML complet (input + bouton)
- ❌ Aucun FormControl déclaré
- 📝 Un TODO indique où ajouter le code

Contraintes :

- Créer un FormControl : `searchControl = new FormControl('', [Validators.minLength(2)])`
- Dans le template, ajouter `[formControl]="searchControl"` sur l'input
- Afficher un message d'erreur avec `@if (searchControl.hasError('minlength'))`
- Écouter les changements : `searchValue = toSignal(this.searchControl.valueChanges.pipe(debounceTime(300)))`
- Créer un `computed()` qui filtre les jeux selon `searchValue()`
- Implémenter la méthode `onReset()` qui appelle `searchControl.reset()`

Résultat attendu dans le navigateur :

- Le champ de recherche est visible sur la home
- Taper moins de 2 caractères affiche un message d'erreur
- La liste se filtre automatiquement en temps réel
- Le bouton "Réinitialiser" vide le champ et restaure la liste complète
- Pas de requête API si la validation échoue

Indices :

- Utiliser `this.searchControl.valueChanges.pipe(debounceTime(300))`
- Créer un validateur personnalisé ou utiliser `Validators.minLength(2)`
- Utiliser `toSignal()` pour convertir `valueChanges` en Signal

## 7) Questions d'auto-évaluation

- Quelle différence entre Template-driven Forms et Reactive Forms ?
- Pourquoi utiliser un interceptor plutôt que dupliquer le code dans chaque service ?
- Comment créer un validateur personnalisé ?
- Où stocker le token JWT et pourquoi ?
- Comment un guard sait-il si l'utilisateur est authentifié ?
- Quelle différence entre `valueChanges` et un Signal ?

## 8) Pistes d'extension (bonus)

- Ajouter un refresh token automatique quand le token expire
- Créer un formulaire d'inscription avec confirmation de password
- Implémenter "Se souvenir de moi" avec différentes durées de token
- Ajouter une gestion des rôles (admin/user) avec `canMatch` guard
- Créer un interceptor pour gérer les erreurs 401 globalement (redirection auto vers login)

## 9) Récapitulatif des 5 séances

**Séance 1** : Signals, control flow moderne, data binding → Home statique  
**Séance 2** : Composants, input()/output(), signals dérivés → UI découpée  
**Séance 3** : Services, HttpClient, Observables → Données depuis API  
**Séance 4** : Routing, guards, lazy loading → Navigation multi-pages  
**Séance 5** : Reactive Forms, authentification, interceptors → App complète et sécurisée

**Résultat final** : Une SPA Angular moderne, prête pour l'intégration d'une API Java en projet d'école !
