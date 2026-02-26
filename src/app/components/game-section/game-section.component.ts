import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
  selector: 'app-game-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-section.component.html',
  styleUrl: './game-section.component.css',
})
export class GameSectionComponent {
  titre = input.required<string>();
  jeux = input.required<JeuCatalogue[]>();
}
