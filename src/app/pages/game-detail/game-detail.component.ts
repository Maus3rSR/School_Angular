import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css',
})
export class GameDetailComponent {}
