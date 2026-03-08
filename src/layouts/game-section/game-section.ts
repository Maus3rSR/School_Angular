import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'game-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-section.html',
  styleUrl: './game-section.css',
})
export class GameSection {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');

  readonly headingId = computed(() => {
    const normalized = this.title()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return `section-${normalized || 'heading'}`;
  });
}
