# Exercices etudiants - Seance 3

Objectif de la seance: reproduire la base HTTP vue en demo, puis appliquer les memes mecanismes a un besoin complementaire sans passer du temps sur le design.

## Sous-concept 1 - Creer GameService et HttpClient

### Exercice 1 (5-10 min) - Reproduction

Objectif: creer `GameService` avec `providedIn: 'root'`.

Contraintes:

- Injection via `inject(HttpClient)`.

### Exercice 2 (5-10 min) - Transfert

Objectif: ajouter une methode `getGameById(id: number)` dans `GameService`.

Contraintes:

- Retour type `Observable<Game>`.
- URL basee sur `environment.apiUrl`.

## Sous-concept 2 - Consommer l'API dans App

### Exercice 1 (5-10 min) - Reproduction

Objectif: creer `environment.ts` et `environment.development.ts`.

### Exercice 2 (5-10 min) - Transfert

Objectif: creer un `computed()` `topGamesFromApi` (rating >= 4.5) et l'afficher dans une 2e section.

Indice:

- `toSignal(service.getGames(), { initialValue: [] })`.

Bloc UI fourni (copier/coller autorise):

```html
<section class="wishflix-catalogue">
  <h2 class="text-xl font-bold">Top notes (API)</h2>
  <div class="wishflix-catalogue__grid">
    @for (game of topGamesFromApi(); track game.id) {
    <article class="card movie-card game-card">
      <h3 class="card-title game-card__title">{{ game.title }}</h3>
    </article>
    }
  </div>
</section>
```

## Sous-concept 3 - Gerer loading et erreurs

### Exercice 1 (5-10 min) - Reproduction

Objectif: ajouter `isLoading` et afficher un message de chargement.

### Exercice 2 (5-10 min) - Transfert

Objectif: gerer aussi l'etat vide (0 resultat) avec un message dedie.

Contraintes:

- Pas de `any`.
- Message visible dans le template.

Bloc UI fourni (copier/coller autorise):

```html
@if (!isLoading() && !errorMessage() && games().length === 0) {
<p class="alert alert-warning">Aucun jeu trouve pour le moment.</p>
}
```
