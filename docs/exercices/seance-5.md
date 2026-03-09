# Exercices etudiants - Seance 5

Objectif de la seance: reproduire le flux login vu en demo, puis finaliser la securisation avec guard et interceptor.

## Sous-concept 1 - Creer le formulaire login reactif

### Exercice 1 (5-10 min) - Reproduction

Objectif: declarer un `FormGroup` login (email + password).

### Exercice 2 (5-10 min) - Transfert

Objectif: ajouter un champ `rememberMe` dans le formulaire et l'exploiter dans `onSubmit()`.

Contraintes:

- `Validators.required`, `Validators.email`, `Validators.minLength(6)`.
- Ne pas modifier le CSS.

Bloc UI fourni (copier/coller autorise):

```html
<label class="label cursor-pointer justify-start gap-3">
  <input type="checkbox" class="checkbox checkbox-sm" formControlName="rememberMe" />
  <span class="label-text">Se souvenir de moi</span>
</label>
```

## Sous-concept 2 - Implementer AuthService

### Exercice 1 (5-10 min) - Reproduction

Objectif: creer `login(email, password)` qui appelle l'API et met a jour l'etat de session.

### Exercice 2 (5-10 min) - Transfert

Objectif: ajouter une methode `token()` et un signal d'etat d'auth utilisable par guard/interceptor.

Indice:

- Utiliser des signaux (`token`, `isAuthenticated`).

Attendu navigateur:

- Si login echoue, un message d'erreur est visible dans la page login.

## Sous-concept 3 - Finaliser guard + interceptor

### Exercice 1 (5-10 min) - Reproduction

Objectif: proteger `/wishlist` avec `authGuard` puis ajouter `Authorization: Bearer <token>` dans l'interceptor.

### Exercice 2 (5-10 min) - Transfert

Objectif: rediriger vers `/login?redirectTo=...` depuis le guard quand l'utilisateur n'est pas connecte.

Contraintes:

- Garder le projet compilable a la fin de l'exercice.
- Conserver une logique simple et lisible (condition + `return next(req)`).

Attendu navigateur:

- Non connecte: acces `/wishlist` redirige vers login avec `redirectTo`.
- Connecte: acces `/wishlist` autorise et header `Authorization` present sur les appels proteges.
