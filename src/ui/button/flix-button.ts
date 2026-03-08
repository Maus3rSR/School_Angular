import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type ButtonType = 'primary' | 'secondary' | 'neutral' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'flix-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.html',
})
export class FlixButton {
  readonly type = input<ButtonType>('primary');
  readonly size = input<ButtonSize>('md');
  readonly block = input(false);

  readonly classes = computed(() => {
    const typeClass = `btn-${this.type()}`;
    const sizeClass = this.size() === 'md' ? '' : `btn-${this.size()}`;
    const blockClass = this.block() ? 'btn-block sm:btn-wide' : '';
    return `btn ${typeClass} ${sizeClass} ${blockClass}`.trim();
  });
}
