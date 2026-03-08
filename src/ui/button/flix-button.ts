import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type ButtonType = 'primary' | 'secondary' | 'neutral' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'flix-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.html',
})
export class FlixButton {
  /**
   * Inputs typés avec unions littérales: seules les variantes prévues sont acceptées.
   * TypeScript bloque les valeurs invalides à la compilation (ex: btn type inconnu).
   * Dans WishFlix, cela sécurise l'usage de DaisyUI tout en gardant une API simple.
   * Pour aller plus loin: https://www.typescriptlang.org/docs/handbook/literal-types.html
   */
  readonly type = input<ButtonType>('primary');
  readonly size = input<ButtonSize>('md');
  readonly block = input(false);

  /**
   * computed assemble les classes CSS à partir des inputs sans état mutable intermédiaire.
   * Le recalcul est automatique quand type/size/block changent, avec un template plus propre.
   * Ce pattern évite ngClass complexe et centralise les règles de style dans le composant.
   * Pour aller plus loin: https://angular.dev/guide/signals#computed-signals
   */
  readonly classes = computed(() => {
    const typeClass = `btn-${this.type()}`;
    const sizeClass = this.size() === 'md' ? '' : `btn-${this.size()}`;
    const blockClass = this.block() ? 'btn-block sm:btn-wide' : '';
    return `btn ${typeClass} ${sizeClass} ${blockClass}`.trim();
  });
}
