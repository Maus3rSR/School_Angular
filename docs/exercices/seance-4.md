# Exercices etudiants - Seance 4

## Sous-concept 1 - Creer les pages standalone

### Exercice 1 (5-10 min)
Objectif: creer la page `HomePage` standalone.

### Exercice 2 (5-10 min)
Objectif: creer la page `NotFoundPage` avec un bouton retour home.

## Sous-concept 2 - Configurer le routing lazy

### Exercice 1 (5-10 min)
Objectif: declarer les routes `home` et `game/:id` en lazy loading.

### Exercice 2 (5-10 min)
Objectif: ajouter la route wildcard `**` vers la page 404.

Contraintes:
- La route `**` reste la derniere.

## Sous-concept 3 - Ajouter le guard

### Exercice 1 (5-10 min)
Objectif: creer `authGuard` qui bloque l'acces a `/wishlist` si non connecte.

### Exercice 2 (5-10 min)
Objectif: rediriger vers `/login` via `UrlTree`.

Indice:
- `router.createUrlTree(['/login'])`.
