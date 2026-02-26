import { Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // TODO (Seance 5 - HttpClient): injecter HttpClient
  // Exemple: private http = inject(HttpClient);
  // Voir docs/seance-5.md

  // TODO (Seance 5 - Signals): creer un signal pour l'utilisateur courant
  // Exemple: private readonly currentUserSignal = signal<User | null>(null);
  // Voir docs/seance-5.md

  // TODO (Seance 5 - Signals): creer un signal pour l'etat d'authentification
  // Exemple: private readonly isAuthenticatedSignal = signal<boolean>(false);
  // Voir docs/seance-5.md

  // TODO (Seance 5): implementer getCurrentUser() qui retourne l'utilisateur courant
  // Cette methode doit retourner la valeur du signal currentUserSignal
  // Voir docs/seance-5.md
  getCurrentUser(): User | null {
    // Methode volontairement vide pour la progression pedagogique.
    return null;
  }

  // TODO (Seance 5): implementer isAuthenticated() qui retourne l'etat d'authentification
  // Cette methode doit retourner la valeur du signal isAuthenticatedSignal
  // Voir docs/seance-5.md
  isAuthenticated(): boolean {
    // Methode volontairement vide pour la progression pedagogique.
    return false;
  }

  // TODO (Seance 5 - Reactive Forms): implementer login(email, password) qui retourne Observable<{token: string}>
  // Cette methode doit faire un appel POST vers l'API pour authentifier l'utilisateur
  // Exemple: return this.http.post<{token}>(`${environment.apiUrl}/auth/login`, {email, password});
  // Puis stocker le token dans localStorage et mettre a jour les signals
  // Voir docs/seance-5.md
  login(email: string, password: string): void {
    void email;
    void password;
    // Methode volontairement vide pour la progression pedagogique.
  }

  // TODO (Seance 5): implementer logout() qui supprime le token et reinitialise les signals
  // Cette methode doit supprimer le token de localStorage et remettre les signals a leur etat initial
  // Voir docs/seance-5.md
  logout(): void {
    // Methode volontairement vide pour la progression pedagogique.
  }
}
