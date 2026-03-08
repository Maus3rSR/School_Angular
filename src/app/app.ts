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

  /**
   * Façade de composant racine: on expose seulement des signaux/read-models utiles au template.
   * Cette approche garde App lisible et évite d'y mettre de la logique métier complexe.
   * Dans WishFlix, la navbar reste synchronisée avec auth + wishlist sans souscriptions manuelles.
   * Pour aller plus loin: https://angular.dev/guide/signals
   */
  protected readonly appName = 'WishFlix';
  protected readonly currentUser = this.authService.currentUser;
  protected readonly isAuthenticated = this.authService.isAuthenticated;
  protected readonly wishlistCount = this.gameCatalog.wishlistCount;

  /**
   * computed crée une valeur dérivée mémoïsée: recalcul uniquement si currentUser change.
   * On évite une méthode appelée à chaque cycle de détection, donc moins de coût inutile.
   * Ici, userLabel fournit un fallback clair pour l'état non connecté (Invite).
   * Pour aller plus loin: https://angular.dev/guide/signals#computed-signals
   */
  protected readonly userLabel = computed(() => this.currentUser()?.name ?? 'Invite');

  protected logout(): void {
    this.authService.logout();
  }
}
