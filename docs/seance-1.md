# Seance 1 sur 5 - Explorer le projet et lier des donnees simples

## 1) Objectifs pedagogiques

- Comprendre la structure minimale d'une application Angular.
- Identifier le role de `src/main.ts`, du composant racine et des templates.
- Relier des donnees du composant vers l'interface (interpolation).
- Faire le lien entre le projet technique et le besoin metier WishFlix.

## 2) Prerequis concrets

- Projet lance avec `pnpm start`.
- Fichiers a ouvrir:
  - `src/main.ts`
  - `src/app/app.ts`
  - `src/app/app.template.html`
  - `src/app/app.css`

## 3) Explication theorique vulgarisee (contexte mini Netflix)

Dans WishFlix, le composant racine joue le role de "page d'accueil" initiale.
Il contient des informations metier simples (nom de l'application, slogan, liste de films de depart) et les affiche dans le template.

Une interpolation, c'est quand on affiche une valeur TypeScript dans le HTML avec `{{ ... }}`.
Exemple concret: afficher `nomApplication` dans la barre du haut.

## 4) Lien avec le code du projet

- `app.ts`: contient les proprietes metier (`nomApplication`, `slogan`, `films`).
- `app.template.html`: affiche ces donnees dans la page.
- `app.css`: style local du composant.

## 5) Etapes de la demo formateur (recette)

### Demo A - Lire la structure

1. Montrer le point d'entree (`main.ts`) puis le composant racine.
2. Expliquer la separation: TypeScript (logique) / HTML (affichage) / CSS (presentation).
3. Relier ce schema au besoin metier: page d'accueil WishFlix.

### Demo B - Modifier une donnee metier

1. Changer la valeur de `slogan` dans `app.ts`.
2. Sauvegarder et observer le rafraichissement automatique dans le navigateur.
3. Expliquer pourquoi Angular met a jour l'affichage.

### Demo C - Ajouter une information simple

1. Ajouter une propriete metier courte (ex: texte d'accroche de section).
2. L'afficher dans le template via interpolation.
3. Verifier la lisibilite et le vocabulaire metier.

## 6) Enonce de l'exercice etudiant (version 2)

Objectif: personnaliser l'accueil WishFlix.

- Ajouter 2 proprietes metier dans `app.ts` (ex: message de bienvenue et nom de la promo).
- Les afficher dans la zone hero de `app.template.html`.
- Ne pas toucher a la configuration Angular, Tailwind ou DaisyUI.

Resultat attendu dans le navigateur:
- la page affiche clairement les nouvelles informations sans erreur.

Indices:
- Utiliser l'interpolation `{{ ... }}`.
- Reutiliser le style deja en place.

## 7) Questions d'auto-evaluation

- Quel fichier demarre l'application Angular?
- Quelle est la difference entre `app.ts` et `app.template.html`?
- Que se passe-t-il si je modifie une propriete affichee dans le template?

## 8) Pistes d'extension (bonus)

- Ajouter une etiquette de progression differente (ex: "Demarrage du projet").
- Afficher un compteur du nombre total de films presents dans la liste initiale.
- Tester un texte conditionnel simple pour preparer la seance 2.
