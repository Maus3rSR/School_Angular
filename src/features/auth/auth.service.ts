import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { AUTH_DATA_SOURCE } from './api/auth.contract';
import { CurrentUser, LoginCredentials } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authDataSource = inject(AUTH_DATA_SOURCE);

  /**
   * Signals: état local réactif pour la session (user/token) sans Subject manuel.
   * Angular recalcule seulement les lectures concernées, ce qui réduit le bruit de rendu.
   * Dans WishFlix, on met à jour navbar/guard immédiatement après login/logout.
   * Pour aller plus loin: https://angular.dev/guide/signals
   */
  private readonly currentUserState = signal<CurrentUser | null>(null);
  private readonly tokenState = signal<string | null>(null);

  readonly currentUser = this.currentUserState.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserState() !== null);

  /**
   * Pipeline RxJS: tap applique l'effet de bord (écrire la session), map produit le résultat UI.
   * Cette séparation évite de mélanger mutation d'état et valeur de retour métier.
   * Ici, LoginPage reçoit un boolean simple, même si la source reste asynchrone (HTTP-ready).
   * Pour aller plus loin: https://rxjs.dev/api/operators/tap
   */
  login(credentials: LoginCredentials): Observable<boolean> {
    return this.authDataSource.authenticate(credentials).pipe(
      tap((session) => {
        if (!session) {
          return;
        }

        this.currentUserState.set(session.user);
        this.tokenState.set(session.token);
      }),
      map((session) => session !== null),
    );
  }

  logout(): void {
    this.currentUserState.set(null);
    this.tokenState.set(null);
  }

  token(): string | null {
    return this.tokenState();
  }
}
