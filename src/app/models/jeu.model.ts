export type GenreJeu = 'Action' | 'RPG' | 'Strategie' | 'Aventure' | 'Multijoueur' | 'Independant';

export interface JeuCatalogue {
  id: number;
  titre: string;
  categorie: 'Nouveautes' | 'Populaires' | 'Classiques';
  genre: GenreJeu;
  anneeSortie: number;
  plateforme: string;
  note: number;
  synopsis: string;
  disponible: boolean;
}
