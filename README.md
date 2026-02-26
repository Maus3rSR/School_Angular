# WishFlix

Mini projet pedagogique Angular pour debutants en reconversion.

L'objectif est de construire un mini Netflix "cheap" pas a pas, en 5 seances.

## Stack

- Angular (standalone)
- TypeScript (strict)
- Tailwind CSS
- DaisyUI
- pnpm

## Demarrer le projet

```bash
pnpm install
pnpm start
```

Application disponible sur `http://localhost:4200/`.

## Scripts utiles

```bash
pnpm start   # dev server
pnpm build   # build de production
pnpm test    # tests unitaires
```

## Support pedagogique

Les supports de seance sont dans `docs/` :

- `docs/seance-1.md`
- `docs/seance-2.md`
- `docs/seance-3.md`
- `docs/seance-4.md`
- `docs/seance-5.md`

Chaque seance contient:

1. Objectifs pedagogiques
2. Prerequis
3. Theorie vulgarisee
4. Lien avec le code
5. Demo formateur
6. Exercice etudiant
7. Auto-evaluation
8. Bonus

## Etat du code

Le code actuel correspond a un **etat initial fonctionnel**.

Il inclut des TODO pedagogiques pour guider les iterations:

- Seance 2: interactions et filtres
- Seance 3: decoupage en composants
- Seance 4: services + routing lazy
- Seance 5: formulaires reactifs

## Documentation Angular recommandee

- https://angular.dev/essentials/components
