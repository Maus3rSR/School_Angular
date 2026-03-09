# Exercices etudiants - Seance 4

Objectif de la seance: reproduire le chargement HTTP vu en demo, puis reutiliser les memes mecanismes avec une configuration d'environnement differente.

## Sous-concept 1 - Brancher HttpClient

### Exercice 1 (5-10 min) - Reproduction

Objectif: ajouter `provideHttpClient()` dans `app.config.ts`.

### Exercice 2 (5-10 min) - Transfert

Objectif: verifier qu'un service existant peut bien injecter `HttpClient` via `inject()` sans erreur de compilation.

Contraintes:

- Ne pas modifier le HTML/CSS.
- Garder les imports au debut du fichier.

## Sous-concept 2 - Charger le catalogue depuis HTTP

### Exercice 1 (5-10 min) - Reproduction

Objectif: remplacer la source locale du catalogue par un appel HTTP `GET` base sur `environment.apiUrl`.

### Exercice 2 (5-10 min) - Transfert

Objectif: ajouter l'etat d'erreur (`errorMessage`) en plus de `isLoading`.

Contraintes:

- Pas de `any`.
- En cas d'erreur HTTP, vider le catalogue et afficher un message lisible.

Bloc UI fourni (copier/coller autorise):

```html
@if (errorMessage()) {
<p class="alert alert-error">{{ errorMessage() }}</p>
}
```

## Sous-concept 3 - Configurer les environnements

### Exercice 1 (5-10 min) - Reproduction

Objectif: configurer `environment.development.ts` avec une URL locale/mock.

### Exercice 2 (5-10 min) - Transfert

Objectif: configurer `environment.ts` avec une URL de production differente.

Contraintes:

- Les fichiers d'environnement sont versionnes.
- Aucun secret (token, mot de passe, cle API privee) ne doit etre commit.

Attendu navigateur:

- En dev, l'app interroge l'URL locale.
- En prod, l'app utilise l'URL de production.
