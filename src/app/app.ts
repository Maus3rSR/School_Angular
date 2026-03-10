import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// @Component relie la classe TypeScript a la vue HTML associee.
// Angular instancie ce composant racine pour piloter l'etat et le rendu de l'ecran principal.
// Dans WishFlix, App orchestre le hero, le filtre et la grille de jeux dans un seul point d'entree.
// Pour aller plus loin: https://angular.dev/essentials/components
@Component({
  selector: 'app-root',
  // En standalone, imports declare explicitement les composants utilises par le template.
  // Cette liste rend les dependances visibles et evite les imports magiques de module global.
  // Dans WishFlix, on comprend vite quelles briques composent la home (GameCard, GameSection, FlixButton).
  // Pour aller plus loin: https://angular.dev/guide/components/importing
  imports: [RouterOutlet],
  templateUrl: './app.template.html',
})
export class App {
  protected readonly nomApplication = 'WishFlix';
}
