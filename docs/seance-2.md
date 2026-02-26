# Seance 2 sur 5 - Rendre la home dynamique

## 1) Objectifs pedagogiques

- Utiliser une boucle pour afficher une liste de films.
- Utiliser une condition pour afficher un message selon l'etat.
- Gerer des clics utilisateur avec un binding d'evenement.
- Comprendre l'interet des signaux pour l'etat local.

## 2) Prerequis concrets

- Avoir termine la seance 1.
- Fichiers a ouvrir:
  - `src/app/app.ts`
  - `src/app/app.template.html`
- TODO de reference dans le code:
  - `appliquerFiltreGenre(...)` dans `app.ts`

## 3) Explication theorique vulgarisee (contexte mini Netflix)

Dans un mini Netflix, le contenu change selon les actions utilisateur:
- afficher tous les films ou seulement ceux disponibles,
- ajouter ou retirer un favori,
- filtrer le catalogue.

L'interface n'est plus statique: elle reactualise automatiquement l'affichage selon l'etat actuel.

## 4) Lien avec le code du projet

- `filmsVisibles` (etat derive) decide quoi afficher.
- `@for` parcourt la liste de films.
- `@if` affiche les variantes d'interface (liste vide, libelles de boutons, etc.).
- `basculerFiltreDisponibilite()` et `basculerFavori(...)` reagissent aux clics.

## 5) Etapes de la demo formateur (recette)

### Demo A - Lire la boucle

1. Reperer la boucle d'affichage des cartes films dans le template.
2. Montrer le lien entre chaque carte et un element de la liste.
3. Verifier que le tracking se fait avec l'identifiant metier.

### Demo B - Lire et expliquer un clic

1. Cliquer sur "Ajouter aux favoris".
2. Montrer la methode appelee dans `app.ts`.
3. Expliquer la mise a jour du signal puis le re-rendu.

### Demo C - Completer un TODO simple

1. Ouvrir le TODO `appliquerFiltreGenre(...)`.
2. Definir une logique minimale de filtre sans casser l'existant.
3. Ajouter un controle simple dans l'interface pour tester le filtre.

## 6) Enonce de l'exercice etudiant (version 2)

Objectif: ajouter un mini filtre metier par genre.

- Completer `appliquerFiltreGenre(genre: GenreFilm | 'Tous'): void`.
- Ajouter des boutons de filtre dans le template.
- Garder le filtre de disponibilite deja existant.

Contraintes:
- Rester dans `app.ts` et `app.template.html`.
- Conserver un code lisible (noms metier explicites).

Resultat attendu dans le navigateur:
- la liste se met a jour quand on choisit un genre,
- le bouton "Tous" restaure l'affichage attendu.

## 7) Questions d'auto-evaluation

- Quelle difference entre un etat "source" et un etat "derive"?
- Pourquoi utilise-t-on un identifiant unique dans la boucle?
- Que se passe-t-il si la liste de films visibles devient vide?

## 8) Pistes d'extension (bonus)

- Ajouter un compteur de films par genre.
- Ajouter un tri simple (note ou annee).
- Preparer une extraction de la carte film vers un composant dedie (seance 3).
