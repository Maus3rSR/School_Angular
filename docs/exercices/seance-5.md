# Exercices etudiants - Seance 5

## Sous-concept 1 - Creer le formulaire login reactif

### Exercice 1 (5-10 min)
Objectif: declarer un `FormGroup` login (email + password).

### Exercice 2 (5-10 min)
Objectif: afficher les erreurs de validation avec `@if`.

Contraintes:
- `Validators.required`, `Validators.email`, `Validators.minLength(6)`.

## Sous-concept 2 - Implementer AuthService

### Exercice 1 (5-10 min)
Objectif: creer `login(email, password)` qui appelle l'API.

### Exercice 2 (5-10 min)
Objectif: implementer `logout()` et `isAuthenticated()`.

Indice:
- Utiliser un signal booleen pour l'etat d'auth.

## Sous-concept 3 - Ajouter l'interceptor HTTP

### Exercice 1 (5-10 min)
Objectif: ajouter `Authorization: Bearer <token>` dans l'interceptor.

### Exercice 2 (5-10 min)
Objectif: enregistrer l'interceptor dans `app.config.ts`.

Contraintes:
- Garder le projet compilable a la fin de l'exercice.
