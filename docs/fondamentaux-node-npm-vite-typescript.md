# Fondamentaux outillage web: Node.js, npm/pnpm, package.json, Vite, TypeScript

Ce document explique les briques techniques que tu vois autour d'un projet frontend moderne comme WishFlix.

## 1) Node.js

### C'est quoi

Node.js est un environnement qui permet d'executer du JavaScript **en dehors du navigateur** (sur ta machine ou sur un serveur).

### Pourquoi on en a besoin en frontend

Dans un projet Angular, Node.js sert surtout a:

- installer les dependances,
- lancer les outils de dev (CLI, tests, build),
- executer des scripts de projet.

Sans Node.js, ni `pnpm install`, ni `ng serve`, ni `ng build` ne fonctionnent.

### A retenir

- Le navigateur execute ton app cliente.
- Node.js execute les outils qui construisent et servent ton app.

---

## 2) npm et pnpm

## npm

- npm = gestionnaire de paquets historique de Node.js.
- Il lit `package.json` pour installer les dependances.
- Commandes classiques: `npm install`, `npm run start`.

## pnpm

- pnpm est un autre gestionnaire de paquets (plus rapide et plus econome en espace disque).
- Il utilise un stockage global et des liens symboliques au lieu de recopier tous les fichiers partout.
- Commandes equivalentes: `pnpm install`, `pnpm start`.

## Pourquoi WishFlix utilise pnpm

Dans ce repo, la version est fixee dans `package.json`:

```json
"packageManager": "pnpm@10.26.0"
```

Avantages pratiques:

1. installs souvent plus rapides,
2. moins de duplication disque,
3. version du gestionnaire explicite pour toute l'equipe.

---

## 3) package.json explique en detail

`package.json` est le fichier central d'un projet Node/frontend.
Il decrit l'identite du projet, ses scripts et ses dependances.

Extrait simplifie (inspire de WishFlix):

```json
{
  "name": "wishflix",
  "version": "0.0.0",
  "private": true,
  "packageManager": "pnpm@10.26.0",
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test"
  },
  "dependencies": {
    "@angular/core": "^21.1.0",
    "rxjs": "~7.8.0"
  },
  "devDependencies": {
    "@angular/cli": "^21.1.5",
    "typescript": "~5.9.2",
    "vitest": "^4.0.8"
  }
}
```

### Champs principaux

1. `name`

- Nom du projet/paquet.

2. `version`

- Version semantique du projet (ex: `1.2.0`).

3. `private`

- Si `true`, empeche une publication accidentelle sur npmjs.org.

4. `packageManager`

- Force l'outil recommande (`pnpm@...`, `npm@...`, etc.).

5. `scripts`

- Alias de commandes executables via `pnpm <script>`.
- Ex: `pnpm start` lance `ng serve`.

6. `dependencies`

- Librairies necessaires **a l'execution** de l'application.
- Ex: Angular runtime, RxJS.

7. `devDependencies`

- Outils necessaires **au developpement/build/test**.
- Ex: CLI, TypeScript, test runner.

### Fichiers lies a package.json

- `pnpm-lock.yaml`: verrouille les versions exactes installees /!\ à versionner dans GIT.
- `node_modules/`: contient les paquets installes.

---

## 4) Role d'un outil de dev comme Vite

Vite (utilisé sous le capot par Angular) est un outil de developpement frontend moderne. Il couvre deux phases:

1. **Developpement local** (serveur dev ultra rapide)
2. **Build production** (bundle optimise)

### Fonctions principales

## a) Dev server

- Demarre un serveur local.
- Recharge rapidement les modules pendant le developpement.

## b) HMR (Hot Module Replacement)

- Met a jour uniquement le module modifie sans recharger toute la page.
- Resultat: feedback quasi instantane et conservation partielle de l'etat UI.

## c) Bundling

- En production, les fichiers sont regroupes/minifies pour etre servis efficacement.
- Objectif: chargement plus rapide et moins de poids reseau.

## d) Optimisations

- Tree-shaking (retire le code non utilise),
- minification,
- split de chunks (plusieurs fichiers de taille raisonnable au lieu d'un seul gros fichier).

### Lien avec Angular

Angular utilise aujourd'hui un outillage moderne tres proche de cette logique (dev server rapide + build optimise). Meme si tu n'executes pas Vite directement dans tous les setups Angular, comprendre ces concepts (HMR, bundling, build prod) reste essentiel.

---

## 5) TypeScript

### C'est quoi

TypeScript est un sur-ensemble de JavaScript qui ajoute un systeme de types statiques.

### Pourquoi c'est utile

- detection d'erreurs plus tot (au moment de la compilation),
- meilleure autocompletion,
- code plus lisible sur des projets d'equipe,
- refactor plus sur.

### Exemple rapide

```ts
function add(a: number, b: number): number {
  return a + b;
}

add(2, 3); // OK
// add('2', 3); // erreur de type
```

### Dans Angular

Angular est pense pour TypeScript:

- composants, services et routes sont typés,
- les templates profitent du typage,
- le projet est plus robuste a mesure qu'il grossit.

---

## 6) Resume mental (qui fait quoi)

- **Node.js**: execute les outils JS hors navigateur.
- **pnpm/npm**: installent les paquets et lancent les scripts.
- **package.json**: decrit le projet (scripts + dependances).
- **Vite / outillage de build moderne**: dev server rapide, HMR, bundle production.
- **TypeScript**: securise et structure le code JavaScript.

Ensemble, ces briques rendent le developpement frontend plus fiable, plus rapide et plus maintenable.
