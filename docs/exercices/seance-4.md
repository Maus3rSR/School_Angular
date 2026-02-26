# Exercices etudiants - Seance 4

Objectif de la seance: reproduire le routing vu en demo, puis reutiliser les memes mecanismes sur une route complementaire sans refaire du design.

## Sous-concept 1 - Creer les pages standalone

### Exercice 1 (5-10 min) - Reproduction

Objectif: creer `HomePage` et `NotFoundPage` en standalone.

### Exercice 2 (5-10 min) - Transfert

Objectif: creer une page `AboutPage` (presentation WishFlix) avec un lien retour home.

Contrainte:

- Reutiliser les classes DaisyUI/Tailwind deja presentes (pas de nouveau CSS).

Bloc UI fourni (copier/coller autorise):

```html
<section class="container mx-auto py-10 px-4">
  <h1 class="text-3xl font-bold mb-4">A propos de WishFlix</h1>
  <p class="opacity-80 mb-6">Mini Netflix pedagogique dedie aux jeux video.</p>
  <a routerLink="/home" class="btn btn-primary">Retour a l'accueil</a>
</section>
```

## Sous-concept 2 - Configurer le routing lazy

### Exercice 1 (5-10 min) - Reproduction

Objectif: declarer les routes `home`, `game/:id` et `**` en lazy loading.

### Exercice 2 (5-10 min) - Transfert

Objectif: ajouter la route `about` en lazy loading + un lien de navigation.

Contraintes:

- La route `**` reste la derniere.
- Ne pas toucher au CSS.

Bloc UI fourni (copier/coller autorise):

```html
<nav class="flex gap-2">
  <a routerLink="/home" class="btn btn-ghost btn-sm">Accueil</a>
  <a routerLink="/about" class="btn btn-ghost btn-sm">A propos</a>
</nav>
```

## Sous-concept 3 - Ajouter le guard

### Exercice 1 (5-10 min) - Reproduction

Objectif: creer `authGuard` qui bloque l'acces a `/wishlist` si non connecte.

### Exercice 2 (5-10 min) - Transfert

Objectif: rediriger vers `/login` avec un query param `redirect` contenant l'URL cible.

Indice:

- `router.createUrlTree(['/login'], { queryParams: { redirect: state.url } })`.

Attendu navigateur:

- En acces refuse sur `/wishlist`, l'URL devient `/login?redirect=%2Fwishlist`.
