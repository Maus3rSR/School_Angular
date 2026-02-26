---
name: image-placeholder-api
description: Utiliser l'API Image Placeholder pour les visuels de jeux vidéo
---

## API Image Placeholder

L'API https://dev.me/products/image-placeholder fournit des images placeholder pour le projet WishFlix.

### URL de base
```
https://dev.me/products/image-placeholder
```

### Paramètres disponibles

- **Catégorie** : Toujours utiliser `Games` pour les jeux vidéo
- **Dimensions** : Format portrait recommandé (ex: 300x450, 400x600)
- **ID** : Identifiant unique pour obtenir une image cohérente

### Formats d'URL recommandés

**Image de jeu (format portrait)** :
```
https://dev.me/products/image-placeholder/300x450/Games/{id}
```

**Image de jeu (format large)** :
```
https://dev.me/products/image-placeholder/600x400/Games/{id}
```

### Bonnes pratiques

1. **Cohérence** : Utiliser un ID fixe pour chaque jeu afin d'avoir toujours la même image
2. **Format portrait** : Privilégier le format portrait (300x450 ou 400x600) pour reproduire l'expérience Netflix
3. **Catégorie Games uniquement** : Ne jamais utiliser d'autre catégorie que `Games`
4. **NgOptimizedImage** : Utiliser la directive Angular `NgOptimizedImage` pour optimiser le chargement
5. **Alt text** : Toujours fournir un texte alternatif descriptif (nom du jeu)

### Exemple d'utilisation dans un template

```html
<img 
  [ngSrc]="'https://dev.me/products/image-placeholder/300x450/Games/' + game.id"
  [alt]="game.title"
  width="300"
  height="450"
  priority
/>
```

### Contexte pédagogique

- **Séance 1** : Utiliser des URLs statiques dans le template
- **Séance 2** : Passer l'URL via `@Input()` au composant GameCard
- **Séance 3** : Construire dynamiquement l'URL dans le service à partir des données API
- **Séance 4** : Charger l'image de détail sur la page du jeu

### Notes importantes

- L'API ne nécessite pas d'authentification
- Les images sont générées aléatoirement mais restent cohérentes pour un même ID
- En production, ces URLs seraient remplacées par de vraies images de jeux Steam
