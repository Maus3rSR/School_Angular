import { Component, computed, inject } from '@angular/core';
import { GameCatalog } from '../../features/game/game-catalog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Game } from '../../features/game/game.model';
import { FlixButton } from '../../ui/button/flix-button';

@Component({
  selector: 'app-game-detail',
  imports: [FlixButton, RouterLink],
  templateUrl: './game-detail.page.html',
  styleUrl: './game-detail.css',
})
export class GameDetail {
  private readonly route = inject(ActivatedRoute);
  protected readonly catalog = inject(GameCatalog);

  private readonly gameId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');

  protected game = computed<Game | undefined>(() => this.catalog.getGameSheet(this.gameId));
}
