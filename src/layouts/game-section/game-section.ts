import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'game-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-section.html',
  styleUrl: './game-section.css',
})
export class GameSection {
  /**
   * input.required impose un contrat clair: chaque section doit avoir un titre.
   * Le composant reste réutilisable car le sous-titre est optionnel avec une valeur par défaut.
   * Dans WishFlix, ce pattern homogénéise les blocs de page sans dupliquer du HTML.
   * Pour aller plus loin: https://angular.dev/guide/components/inputs
   */
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');

  /**
   * computed génère un id stable dérivé du titre pour relier section et heading via aria-labelledby.
   * On obtient une meilleure accessibilité sans gérer d'état supplémentaire.
   * Cette dérivation automatique évite aussi les collisions d'id écrits à la main.
   * Pour aller plus loin: https://angular.dev/guide/signals#computed-signals
   */
  readonly headingId = computed(() => {
    const normalized = this.title()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return `section-${normalized || 'heading'}`;
  });
}
