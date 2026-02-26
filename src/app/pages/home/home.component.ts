import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // TODO (Seance 4 - routing): migrer la logique de app.ts vers ce composant
  // A partir de la seance 4, ce composant devient la page d'accueil
  // Il doit contenir tous les signals et methodes actuellement dans app.ts
  // Voir docs/seance-4.md
}
