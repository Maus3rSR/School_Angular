# Seance 3 sur 5 - Decouper l'UI en composants reutilisables

## 1) Objectifs pedagogiques

- Comprendre pourquoi decouper un template monolithique.
- Creer des composants metier reutilisables (`FilmCard`, `FilmSection`).
- Faire circuler les donnees et evenements entre parent/enfant.
- Maintenir une architecture lisible pour faire evoluer WishFlix.

## 2) Prerequis concrets

- Avoir termine la seance 2.
- Point de depart: home encore monolithique dans `app.template.html`.
- Fichiers de depart:
  - `src/app/app.ts`
  - `src/app/app.template.html`

## 3) Explication theorique vulgarisee (contexte mini Netflix)

Quand la home grossit, un seul gros composant devient difficile a lire, tester et faire evoluer.
Le decoupage en composants permet:
- de reutiliser la meme carte film,
- de clarifier les responsabilites,
- d'accelerer les evolutions du produit.

## 4) Lien avec le code du projet

- Le parent garde l'etat global (catalogue, favoris, filtres).
- Le composant carte recoit un film en entree.
- Le composant carte emet un evenement pour "ajouter/retirer favori".

Exemple de signature courte autorisee:
- entree: `film = input.required<FilmCatalogue>();`
- sortie: `favoriToggle = output<number>();`

## 5) Etapes de la demo formateur (recette)

### Demo A - Identifier les blocs repetes

1. Dans `app.template.html`, reperer la partie "carte film" repetee.
2. Definir ce qui appartient a la carte vs au parent.
3. Nommer le nouveau composant avec un nom metier clair.

### Demo B - Extraire la carte film

1. Creer `FilmCardComponent`.
2. Passer un film en entree.
3. Remplacer le HTML de la carte dans la boucle parent.

### Demo C - Remonter un evenement

1. Ajouter un bouton favori dans la carte.
2. Emettre l'identifiant du film via la sortie.
3. Raccorder la sortie a la methode parent existante.

## 6) Enonce de l'exercice etudiant (version 2)

Objectif: creer un composant `FilmSectionComponent` pour regrouper un titre + une liste de cartes.

Contraintes:
- Le parent principal conserve l'etat global.
- `FilmSectionComponent` reste presentational (affichage + emission d'evenements).
- Pas de logique metier lourde dans le template.

Resultat attendu:
- l'interface fonctionne comme avant,
- le fichier principal est plus court et plus lisible.

## 7) Questions d'auto-evaluation

- Pourquoi ne pas mettre toute la logique dans la carte enfant?
- Quelle difference entre une entree et une sortie de composant?
- Qu'est-ce qui reste dans le composant parent apres extraction?

## 8) Pistes d'extension (bonus)

- Ajouter un composant de badge de note reutilisable.
- Factoriser un composant de barre d'actions de filtre.
- Comparer lisibilite "avant/apres" sur la home.
