# Exercices etudiants - Seance 5

Objectif de la seance: reproduire le flux login vu en demo, puis appliquer les memes mecanismes sur des cas auth complementaires sans faire de design.

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

Objectif: creer `login(email, password)` qui appelle l'API.

### Exercice 2 (5-10 min) - Transfert

Objectif: ajouter un signal `authError` pour exposer une erreur de connexion exploitable par l'UI.

Indice:

- Utiliser un signal booleen pour l'etat d'auth.

Attendu navigateur:

- Si login echoue, un message d'erreur est visible dans la page login.

## Sous-concept 3 - Ajouter l'interceptor HTTP

### Exercice 1 (5-10 min) - Reproduction

Objectif: ajouter `Authorization: Bearer <token>` dans l'interceptor.

### Exercice 2 (5-10 min) - Transfert

Objectif: ne pas ajouter le header `Authorization` pour les requetes vers `/auth/login`.

Contraintes:

- Garder le projet compilable a la fin de l'exercice.
- Conserver une logique simple et lisible (condition + `return next(req)`).
