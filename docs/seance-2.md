# Séance 2 sur 5 - Composants et communication

## 1) Objectifs pédagogiques

- Découper l'UI en composants réutilisables (GameCard, GameSection)
- Maîtriser la communication parent-enfant avec `input()` et `output()`
- Comprendre `ChangeDetectionStrategy.OnPush` pour les performances
- Utiliser les signals dérivés avec `computed()`
- Gérer les favoris avec des signals partagés

## 2) Prérequis concrets

- Avoir terminé la séance 1 (signals et filtres fonctionnels dans `app.ts`)
- Fichiers à ouvrir :
  - `src/app/app.ts` (composant parent avec logique)
  - `src/app/components/game-card/game-card.component.ts` (structure vide à compléter)
  - `src/app/components/game-section/game-section.component.ts` (structure vide à compléter)
- **État initial** :
  - ✅ Les composants GameCard et GameSection existent déjà avec leurs templates HTML complets
  - ❌ Aucun `input()` / `output()` déclaré, aucune logique implémentée
  - 📝 Des TODO indiquent où ajouter les inputs/outputs

## 3) Explication théorique vulgarisée (contexte WishFlix)

### Pourquoi découper en composants ?

Actuellement, la home affiche tout dans un seul gros template. Quand le projet grandit, cela devient difficile à maintenir. Le découpage permet :

- **Réutilisation** : la carte de jeu peut servir ailleurs (favoris, recherche)
- **Clarté** : chaque composant a une responsabilité précise
- **Testabilité** : on peut tester une carte indépendamment

### Communication parent-enfant moderne

Angular propose maintenant des **fonctions** au lieu de decorators :

- `input()` : le parent passe des données à l'enfant
- `output()` : l'enfant notifie le parent d'un événement

Exemple : la carte (enfant) reçoit un jeu via `input()` et émet un événement "favori cliqué" via `output()`.

### ChangeDetectionStrategy.OnPush

Cette stratégie dit à Angular : "ne vérifie ce composant que si ses inputs changent". Avec les signals, c'est automatique et performant.

### Signals dérivés

Un `computed()` recalcule automatiquement sa valeur quand les signals dont il dépend changent. Parfait pour "jeux filtrés" ou "nombre de favoris".

## 4) Lien avec le code du projet

- **HomeComponent** (parent) : garde l'état global (catalogue, favoris, filtres)
- **GameCardComponent** (enfant) : affiche un jeu, émet des événements (clic favori, clic détail)
- **GameSectionComponent** (enfant) : regroupe un titre + une liste de cartes
- Les favoris sont gérés par un signal dans le parent, accessible via `computed()`

## 5) Étapes de la démo formateur (recette)

### Démo A - Compléter GameCardComponent

1. Ouvrir `src/app/components/game-card/game-card.component.ts` (déjà créé)
2. **Le template HTML est déjà complet** avec toute la carte stylée
3. Ajouter `changeDetection: ChangeDetectionStrategy.OnPush` dans le decorator
4. Créer l'input : `game = input.required<Game>()`
5. Créer l'output : `favoriteToggle = output<number>()`
6. Dans le template, remplacer les données statiques par `game().titre`, `game().image`, etc.
7. Connecter le bouton favori : `(click)="onToggleFavorite()"`

### Démo B - Utiliser GameCardComponent dans app.ts

1. Importer `GameCardComponent` dans `App` (composant racine)
2. Dans `app.template.html`, remplacer le HTML de la carte par `<app-game-card>`
3. Passer le jeu : `[game]="jeu"`
4. Écouter l'événement : `(favoriteToggle)="toggleFavorite($event)"`
5. Vérifier que l'affichage et les interactions fonctionnent

### Démo C - Ajouter la logique des favoris

1. Créer un signal `favoriteIds = signal<Set<number>>(new Set())`
2. Créer un `computed()` : `isFavorite = computed(() => favoriteIds().has(game().id))`
3. Dans GameCard, afficher une icône différente selon `isFavorite()`
4. Implémenter `toggleFavorite()` qui modifie le Set avec `.update()`

## 6) Énoncé de l'exercice étudiant (version 2)

**Objectif** : Compléter GameSectionComponent pour organiser les jeux par catégorie

**Point de départ** :

- ✅ Le composant GameSectionComponent existe avec son template HTML complet
- ❌ Aucun input/output déclaré, classe TypeScript vide
- 📝 Un TODO indique où ajouter le code

Contraintes :

- Ajouter les inputs :
  - `title = input.required<string>()`
  - `games = input.required<Game[]>()`
- Ajouter l'output : `favoriteToggle = output<number>()`
- Utiliser `ChangeDetectionStrategy.OnPush`
- Dans le template, remplacer le titre statique par `{{ title() }}`
- Remplacer la boucle statique par `@for (game of games(); track game.id)`
- Remonter l'événement : `(favoriteToggle)="favoriteToggle.emit($event)"`

Résultat attendu dans le navigateur :

- La home affiche plusieurs sections (ex: "Action", "RPG", "Nouveautés")
- Chaque section a son titre et sa liste de jeux
- Les favoris fonctionnent toujours correctement
- Le code de HomeComponent est plus court et lisible

Indices :

- Utiliser `(favoriteToggle)="favoriteToggle.emit($event)"` pour remonter l'événement
- Le parent garde la logique métier, les enfants sont "présentationnels"

## 7) Questions d'auto-évaluation

- Quelle différence entre `input()` et `output()` ?
- Pourquoi utiliser `ChangeDetectionStrategy.OnPush` ?
- Qu'est-ce qu'un composant "présentationnel" vs "container" ?
- Comment un `computed()` sait-il quand se recalculer ?
- Pourquoi utiliser `input.required()` plutôt que `input()` ?

## 8) Pistes d'extension (bonus)

- Créer un GameBadgeComponent pour afficher la note avec des étoiles
- Ajouter une projection de contenu (`<ng-content>`) dans GameSection
- Créer un signal `viewMode` (grille/liste) et adapter l'affichage
- Extraire les filtres dans un FilterBarComponent réutilisable
