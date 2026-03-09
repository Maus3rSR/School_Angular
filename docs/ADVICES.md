# ADVICES - Comment comprendre le code final WishFlix

Ce document sert de **guide de lecture** pour une codebase Angular deja fournie.
L'objectif n'est pas de tout lire d'un coup, mais de savoir **par ou commencer**, **dans quel ordre**, et **comment suivre le dataflow**.

---

## 1) Plan rapide de prise en main (30 a 45 min)

### Etape A - Comprendre le demarrage de l'application (5 min)

1. `src/main.ts`
2. `src/app/app.config.ts`
3. `src/app/app.routes.ts`
4. `src/app/app.ts`
5. `src/app/app.template.html`

But: identifier le **point d'entree runtime** (bootstrap) puis le **point d'entree UI**.

### Etape B - Lire la structure des dossiers (10 min)

Commencer par repere visuel:

- `src/app/` : coeur de l'application
- `src/environments/` : config dev/prod (URL API, flags)
- `docs/` : seulement nécéssaire par rapport aux cours

Puis repere fonctionnel (structure cible finale WishFlix):

- `pages/` : pages routees (`home`, `detail`, `wishlist`, `login`, `not-found`)
- `components/` ou `features/` : composants metier reutilisables (game card, sections)
- `services/` : appels HTTP + logique metier partagee
- `guards/` : protection des routes
- `interceptors/` : enrichissement des requetes HTTP (cas du token pour l'authentification)
- `models/` : types/interfaces metier
- `ui/` / `layouts/` : composants d'interfaces sans logique métier complexe

### Etape C - Suivre 3 flux metier de bout en bout (15 a 20 min)

1. **Flux catalogue**: affichage des jeux
2. **Flux auth**: login/logout + token
3. **Flux navigation**: route publique vs route protegee

Ne lisez pas tous les fichiers. Pour chaque flux, suivez juste la chaine complete:

- UI (template)
- composant/page TS
- service
- infrastructure Angular (route, guard, interceptor)
- retour UI

---

## 2) Comment trouver le point d'entree d'un code

Quand vous ouvrez un fichier sans contexte, posez-vous ces 3 questions:

1. **Qui l'appelle ?**
2. **Qui il appelle ?**
3. **Quel evenement declenche son execution ?**

### Methode pratique

#### Cas 1 - Je veux comprendre une page

1. Ouvrir `app.routes.ts` et trouver la route (`/home`, `/wishlist`, etc.).
2. Ouvrir la page cible (template + TS).
3. Reperer:
   - ses `input()` / `output()`
   - ses signaux/computed
   - ses appels services
4. Descendre vers les composants enfants utilises dans le template.

#### Cas 2 - Je veux comprendre une donnee (ex: liste des jeux)

1. Partir de l'affichage dans le template (`@for (...)`).
2. Trouver la source dans le TS (signal/computed/Observable->Signal).
3. Trouver le service qui alimente cette source.
4. Trouver l'appel HTTP et l'URL (`environment`).

#### Cas 3 - Je veux comprendre un acces refuse

1. Partir de la route protegee dans `app.routes.ts`.
2. Ouvrir le guard associe.
3. Voir la condition (etat auth, token, role...).
4. Verifier l'interceptor et `AuthService`.

---

## 3) Sens de lecture recommande pour des debutants

Ne pas lire dossier par dossier en mode explorateur.
Lisez par **scenario utilisateur**:

1. Afficher la home
2. Ouvrir un detail
3. Ajouter/retirer un favori
4. Se connecter
5. Acceder a une route protegee

Pour chaque scenario, notez:

- le composant/page d'entree
- le service implique
- les effets de bord (navigation, HTTP, stockage token)

C'est la meilleure facon de transformer une "grosse base" en petits morceaux comprenables.

---

## 4) Grille d'analyse express d'un fichier TypeScript

Quand vous ouvrez un fichier `.ts`, scannez dans cet ordre:

1. **Imports**: dependances Angular, services, models.
2. **Decorator/config**: role du fichier (`@Component`, guard, interceptor, service).
3. **Etat**: signaux, computed, champs prives.
4. **API publique**: methodes appelees depuis le template ou l'exterieur.
5. **Effets**: HTTP, navigation, stockage local, redirections.

En 60 secondes, vous savez deja pourquoi le fichier existe.
