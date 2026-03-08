import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FlixButton } from '../../../../ui/button/flix-button';
import { Game } from '../../game.model';

@Component({
  selector: 'game-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink, FlixButton],
  templateUrl: './game-card.template.html',
  styleUrl: './game-card.component.css',
})
export class GameCard {
  /**
   * input()/output() définissent une API de composant explicite et fortement typée.
   * input.required force le parent à fournir game, donc moins de bugs d'undefined au runtime.
   * output<number> formalise l'événement émis (id du jeu) pour simplifier la communication parent/enfant.
   * Pour aller plus loin: https://angular.dev/guide/components/inputs
   */
  readonly game = input.required<Game>();
  readonly favorite = input(false);
  readonly wishlistToggle = output<number>();

  toggleFavorite(): void {
    this.wishlistToggle.emit(this.game().id);
  }
}
