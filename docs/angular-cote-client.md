# Angular côté client: à quoi ça sert ?

## 1) Le rôle d'Angular dans le web côté client

Le **côté client** (frontend) est la partie qui s'exécute dans le navigateur:

- afficher l'interface,
- réagir aux clics,
- gérer l'état de l'UI,
- appeler des APIs.

Angular existe pour rendre ce travail **plus structuré** quand l'application grossit.

En JavaScript natif, un petit écran est simple. Mais quand on ajoute plusieurs pages, des formulaires, de l'authentification, des appels HTTP et des règles métier (comme dans WishFlix), le code peut vite devenir difficile à maintenir.

## 2) Pourquoi Angular existe

Angular apporte un cadre prêt à l'emploi pour:

1. **Structurer l'app** en composants réutilisables.
2. **Lier données et UI** sans manipuler le DOM manuellement à chaque changement.
3. **Gérer l'état** proprement (signals, computed).
4. **Organiser la navigation** (routing, lazy loading).
5. **Standardiser les pratiques** (tests, architecture, DI, formulaires, HTTP).

En résumé: Angular réduit le "code bricolage" et augmente la lisibilité/maintenabilité d'une app métier.

## 3) Comparaison simple: compteur

## JavaScript natif

```html
<div id="counter-app">
  <button id="dec">-</button>
  <span id="value">0</span>
  <button id="inc">+</button>
</div>

<script>
  let count = 0;

  const valueEl = document.querySelector('#value');
  const incBtn = document.querySelector('#inc');
  const decBtn = document.querySelector('#dec');

  function render() {
    valueEl.textContent = count;
  }

  incBtn.addEventListener('click', () => {
    count += 1;
    render();
  });

  decBtn.addEventListener('click', () => {
    count -= 1;
    render();
  });
</script>
```

### Ce qu'on fait à la main en natif

- sélectionner les éléments DOM,
- gérer les listeners,
- appeler `render()` après chaque modification.

## Version Angular (signals)

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter-demo',
  template: `
    <div class="counter-demo">
      <button type="button" (click)="decrement()">-</button>
      <span>{{ count() }}</span>
      <button type="button" (click)="increment()">+</button>
    </div>
  `,
})
export class CounterDemoComponent {
  protected readonly count = signal(0);

  protected increment(): void {
    this.count.update((value) => value + 1);
  }

  protected decrement(): void {
    this.count.update((value) => value - 1);
  }
}
```

### Ce qu'Angular gère pour nous

- la synchro UI (`{{ count() }}` se met à jour automatiquement),
- le binding d'événement (`(click)`),
- la logique de rendu (pas de `querySelector` ni de `render()` manuel).
