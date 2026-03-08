import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from '../features/auth/auth.service';
import { GameCatalogService } from '../features/game/game-catalog.service';
import { FlixButton } from '../ui/button/flix-button';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FlixButton],
  templateUrl: './app.template.html',
  styleUrls: ['./app.css'],
})
export class App {
  private readonly authService = inject(AuthService);
  private readonly gameCatalog = inject(GameCatalogService);

  protected readonly appName = 'WishFlix';
  protected readonly currentUser = this.authService.currentUser;
  protected readonly isAuthenticated = this.authService.isAuthenticated;
  protected readonly wishlistCount = this.gameCatalog.wishlistCount;

  protected readonly userLabel = computed(() => this.currentUser()?.name ?? 'Invite');

  protected logout(): void {
    this.authService.logout();
  }
}
