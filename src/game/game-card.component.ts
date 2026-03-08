import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FlixButton } from '../ui/button/flix-button';
import { Game } from './game.model';

@Component({
  selector: 'game-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink, FlixButton],
  templateUrl: './game-card.template.html',
  styleUrl: './game-card.component.css',
})
export class GameCard {
  readonly game = input.required<Game>();
  readonly favorite = input(false);
  readonly wishlistToggle = output<number>();

  toggleFavorite(): void {
    this.wishlistToggle.emit(this.game().id);
  }
}
