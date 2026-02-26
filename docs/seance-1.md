# Séance 1 sur 5 - Fondations Angular

## 1) Objectifs pédagogiques

- Comprendre la structure d'une application Angular moderne (standalone components)
- Découvrir les **Signals** : `signal()`, `computed()`, `effect()`
- Maîtriser le **data binding** : interpolation, property binding, event binding
- Utiliser le **control flow moderne** : `@if`, `@for`, `@switch`
- Construire la home WishFlix avec une liste statique et un filtrage simple

## 2) Prérequis concrets

- Projet lancé avec `pnpm start`
- Fichiers à ouvrir :
  - `src/main.ts` (point d'entrée)
  - `src/app/app.ts` (composant racine)
  - `src/app/app.template.html` (UI complète déjà présente)
- **État initial du projet** :
  - ✅ L'interface est 100% terminée visuellement (cartes de jeux, filtres, boutons)
  - ❌ Aucun code Angular fonctionnel (pas de signals, pas de méthodes implémentées)
  - 📝 Des TODO indiquent où ajouter la logique

## 3) Explication théorique vulgarisée (contexte WishFlix)

### Standalone components

WishFlix utilise des **composants autonomes** (standalone), la façon moderne de créer des composants Angular. Plus besoin de modules : chaque composant déclare ses propres dépendances.

### Signals : la réactivité moderne

Un **Signal** est une valeur qui "prévient" Angular quand elle change. Comme un panneau lumineux qui s'allume automatiquement.

- `signal()` : crée une valeur réactive (ex: liste de jeux vidéo)
- `computed()` : calcule automatiquement une valeur dérivée (ex: jeux filtrés)
- `effect()` : réagit aux changements (ex: logger dans la console)

### Control flow moderne

Angular propose maintenant une syntaxe native pour les conditions et boucles :

- `@if (condition) { ... }` au lieu de `*ngIf`
- `@for (item of items; track item.id) { ... }` au lieu de `*ngFor`
- `@switch` au lieu de `*ngSwitch`

### Data binding

- **Interpolation** : `{{ titre }}` affiche une valeur
- **Property binding** : `[src]="imageUrl"` lie une propriété
- **Event binding** : `(click)="filtrer()"` réagit à un événement

## 4) Lien avec le code du projet

- `home.component.ts` : contient les signals (catalogue de jeux, filtre actif)
- `home.component.html` : affiche la liste avec `@for`, les filtres avec `@if`
- Les jeux vidéo sont représentés par une interface `Game` avec titre, genre, image, etc.

## 5) Étapes de la démo formateur (recette)

### Démo A - Découvrir les Signals

1. Ouvrir `app.ts` et montrer la structure vide du composant
2. Expliquer qu'on va créer un signal pour stocker les jeux : `games = signal<Game[]>([])`
3. Montrer comment initialiser avec des données statiques
4. Créer un `computed()` pour filtrer les jeux disponibles
5. Afficher dans la console avec `effect()` pour voir les changements en temps réel

### Démo B - Afficher la liste avec @for

1. Ouvrir `app.template.html` et repérer la zone où afficher les jeux
2. **Le template HTML est déjà complet** avec toutes les cartes stylées
3. Ajouter `@for (jeu of games(); track jeu.id)` pour rendre la liste dynamique
4. Remplacer les données statiques du template par `{{ jeu.titre }}`, `{{ jeu.genre }}`, etc.
5. Vérifier que l'affichage fonctionne dans le navigateur

### Démo C - Ajouter un filtre avec @if

1. Créer un signal `showOnlyAvailable = signal(false)`
2. **Le bouton existe déjà dans le template**, ajouter l'event binding `(click)="toggleFilter()"`
3. Implémenter la méthode `toggleFilter()` qui inverse la valeur du signal
4. Créer un `computed()` nommé `filteredGames` qui filtre selon `showOnlyAvailable()`
5. Utiliser `@if` pour afficher un badge indiquant le filtre actif

## 6) Énoncé de l'exercice étudiant (version 2)

**Objectif** : Ajouter un filtre par genre de jeu vidéo

**Point de départ** :

- ✅ Les boutons de genre existent déjà visuellement dans le template
- ❌ Ils ne sont pas connectés à la logique Angular
- 📝 Un TODO indique où ajouter le code

Contraintes :

- Créer un signal `selectedGenre = signal<string | null>(null)`
- Trouver les boutons de genre dans le template et ajouter `(click)="selectGenre('Action')"`
- Implémenter la méthode `selectGenre(genre: string | null)`
- Créer un `computed()` nommé `visibleGames` qui combine les deux filtres
- Utiliser `@if` pour afficher un message quand la liste est vide

Résultat attendu dans le navigateur :

- Cliquer sur "Action" filtre uniquement les jeux d'action
- Cliquer sur "Tous" restaure l'affichage complet
- Un message "Aucun jeu ne correspond" s'affiche si nécessaire
- Le compteur de jeux se met à jour automatiquement

Indices :

- Le template HTML est déjà complet, ne pas le recréer
- Utiliser `computed()` pour éviter de dupliquer la logique de filtrage
- Penser à mettre à jour `visibleGames` dans le `@for`

## 7) Questions d'auto-évaluation

- Quelle différence entre `signal()` et `computed()` ?
- Pourquoi utiliser `@for` avec `track` plutôt que sans ?
- Quelle est la différence entre `{{ }}`, `[]` et `()` dans un template ?

## 8) Pistes d'extension (bonus)

- Ajouter un compteur de jeux affichés avec `computed()`
- Créer un signal pour trier par note (croissant/décroissant)
- Utiliser `@switch` pour afficher différents messages selon le nombre de résultats
- Ajouter un `effect()` qui sauvegarde le filtre actif dans `localStorage`
