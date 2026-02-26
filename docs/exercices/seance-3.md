# Exercices etudiants - Seance 3

## Sous-concept 1 - Creer GameService et HttpClient

### Exercice 1 (5-10 min)
Objectif: creer `GameService` avec `providedIn: 'root'`.

Contraintes:
- Injection via `inject(HttpClient)`.

### Exercice 2 (5-10 min)
Objectif: implementer `getGames()` avec `http.get<Game[]>()`.

## Sous-concept 2 - Consommer l'API dans App

### Exercice 1 (5-10 min)
Objectif: creer `environment.ts` et `environment.development.ts`.

### Exercice 2 (5-10 min)
Objectif: convertir `getGames()` en signal dans `App`.

Indice:
- `toSignal(service.getGames(), { initialValue: [] })`.

## Sous-concept 3 - Gerer loading et erreurs

### Exercice 1 (5-10 min)
Objectif: ajouter `isLoading` et afficher un message de chargement.

### Exercice 2 (5-10 min)
Objectif: ajouter `errorMessage` et afficher une alerte en cas d'erreur API.

Contraintes:
- Pas de `any`.
- Message visible dans le template.
