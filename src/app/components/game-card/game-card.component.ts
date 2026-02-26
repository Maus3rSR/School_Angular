import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

interface JeuCatalogue {
  id: number;
  titre: string;
  categorie: 'Nouveautes' | 'Populaires' | 'Classiques';
  genre: string;
  anneeSortie: number;
  plateforme: string;
  note: number;
  synopsis: string;
  disponible: boolean;
}

@Component({
  selector: 'app-game-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent {
  // TODO (Seance 2 - input): declarer un input pour recevoir le jeu depuis le parent
  // Exemple: jeu = input.required<JeuCatalogue>();
  // Voir docs/seance-2.md
  // PLACEHOLDER temporaire pour que le template compile:
  protected jeu = () => ({
    id: 0,
    titre: 'Placeholder',
    categorie: 'Nouveautes' as const,
    genre: 'Action' as const,
    anneeSortie: 2024,
    plateforme: 'PC',
    note: 0,
    synopsis: '',
    disponible: false,
  });

  // TODO (Seance 2 - input): declarer un input pour savoir si le jeu est en favoris
  // Exemple: estFavori = input<boolean>(false);
  // Voir docs/seance-2.md
  // PLACEHOLDER temporaire pour que le template compile:
  protected estFavori = () => false;

  // TODO (Seance 2 - output): declarer un output pour emettre l'evenement de toggle favori
  // Exemple: toggleFavori = output<number>();
  // Voir docs/seance-2.md

  // TODO (Seance 2 - event binding): implementer la methode onToggleFavori()
  // Cette methode doit emettre l'ID du jeu via l'output toggleFavori
  // Exemple: this.toggleFavori.emit(this.jeu().id);
  // Voir docs/seance-2.md
  protected onToggleFavori(): void {
    // Methode volontairement vide pour la progression pedagogique.
  }
}
