---
name: image-placeholder-api
description: Utiliser l'API Image Placeholder pour les visuels de jeux vidéo
---

## API Image Placeholder

L'API `https://via.assets.so/game.png` fournit des images placeholder pour le projet WishFlix.

### URL de base

```
https://via.assets.so/game.png
```

### Paramètres disponibles

- **id** : Identifiant unique pour obtenir une image cohérente
- **q** : Qualité de l'image (ex: `95`)
- **w** : Largeur de l'image
- **h** : Hauteur de l'image
- **fit** : Mode de redimensionnement (utiliser `contain`)
- **Dimensions recommandées** (inspirées Netflix)
  - **Poster portrait** : 300x450 (ratio 2:3, format standard des affiches)
  - **Poster large** : 342x513 ou 185x278 (miniatures Netflix)
  - **Backdrop paysage** : 780x439 ou 1280x720 (ratio 16:9, bannières)
  - **Thumbnail carré** : 150x150 ou 200x200 (icônes de profil)

### Formats d'URL recommandés

**Image de jeu (format portrait)** :

```
https://via.assets.so/game.png?id={id}&q=95&w=300&h=450&fit=cover
```

**Image de jeu (format large)** :

```
https://via.assets.so/game.png?id={id}&q=95&w=600&h=400&fit=cover
```

### Bonnes pratiques

1. **Cohérence** : Utiliser un ID fixe pour chaque jeu afin d'avoir toujours la même image
2. **Cohérence des paramètres** : Utiliser `q=95` et `fit=contain` sur tout le projet
3. **Alt text** : Toujours fournir un texte alternatif descriptif (nom du jeu)

### Exemple d'utilisation dans un template

```html
<img
  [ngSrc]="'https://via.assets.so/game.png?id=' + game.id + '&q=95&w=300&h=450&fit=cover'"
  [alt]="game.title"
  width="300"
  height="450"
  priority
/>
```

### Contexte pédagogique

- **Séance 1** : Utiliser des URLs statiques en dur dans `app.template.html`
- **Séance 2** : Passer l'URL via `input()` au composant GameCard
- **Séance 3** : Construire dynamiquement l'URL dans le service à partir des données API
- **Séance 4** : Charger l'image de détail sur la page du jeu

### Notes importantes

- L'API ne nécessite pas d'authentification
- Les images restent cohérentes pour un même `id`
- En production, ces URLs seraient remplacées par de vraies images de jeux Steam
