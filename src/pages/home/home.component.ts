import { Component, computed, Inject, inject, OnInit, signal } from '@angular/core';
import { FlixButton } from '../../ui/button/flix-button';
import { GameSection } from '../../layouts/game-section/game-section';
import { NgOptimizedImage } from '@angular/common';
import { GameCard } from '../../features/game/game-card.component';
import { Game } from '../../features/game/game.model';
import { GameCatalog } from '../../features/game/game-catalog';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  imports: [NgOptimizedImage, FlixButton, GameSection, GameCard],
})
export class Home implements OnInit {
  // Injection avec un decorateur de propriété
  // @Inject(GameCatalog)
  // private readonly catalog;

  // Injection avec la méthode "inject"
  protected readonly catalog = inject(GameCatalog);

  // computed de presentation: derive le libelle du bouton depuis onlyAvailable().
  // Le template reste simple car il lit une valeur prete a afficher, sans logique conditionnelle inline.
  // Dans WishFlix, le CTA reflete toujours l'action suivante attendue par l'utilisateur.
  // Pour aller plus loin: https://angular.dev/guide/signals
  protected filterAvailibilityLabel = computed((): string => {
    return this.catalog.onlyAvailable() ? 'Voir tous les jeux' : 'Voir les jeux disponibles';
  });

  ngOnInit() {
    this.catalog.loadGames();
  }
}
