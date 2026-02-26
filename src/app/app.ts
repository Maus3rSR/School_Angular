import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

type GenreJeu = 'Action' | 'RPG' | 'Strategie' | 'Aventure' | 'Multijoueur' | 'Independant';

interface JeuCatalogue {
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

const CATALOGUE_INITIAL: JeuCatalogue[] = [
  {
    id: 1,
    titre: 'Cyber Nexus 2077',
    categorie: 'Nouveautes',
    genre: 'RPG',
    anneeSortie: 2023,
    plateforme: 'PC, PS5, Xbox',
    note: 4.5,
    synopsis:
      'Plongez dans une metropole cyberpunk ou vos choix faconnent le destin de la ville.',
    disponible: true,
  },
  {
    id: 2,
    titre: 'Stellar Warfare',
    categorie: 'Nouveautes',
    genre: 'Action',
    anneeSortie: 2024,
    plateforme: 'PC, PS5',
    note: 4.2,
    synopsis:
      'Combat spatial intense dans un univers en guerre. Pilotez votre vaisseau et dominez la galaxie.',
    disponible: true,
  },
  {
    id: 3,
    titre: 'Kingdom Tactics',
    categorie: 'Populaires',
    genre: 'Strategie',
    anneeSortie: 2023,
    plateforme: 'PC',
    note: 4.7,
    synopsis: 'Batissez votre empire medieval et menez vos armees vers la victoire strategique.',
    disponible: true,
  },
  {
    id: 4,
    titre: 'Shadow Legends',
    categorie: 'Classiques',
    genre: 'Aventure',
    anneeSortie: 2020,
    plateforme: 'PC, PS4, Xbox',
    note: 4.8,
    synopsis: 'Une aventure epique dans un monde fantastique rempli de mysteres et de dangers.',
    disponible: true,
  },
  {
    id: 5,
    titre: 'Pixel Warriors',
    categorie: 'Populaires',
    genre: 'Independant',
    anneeSortie: 2022,
    plateforme: 'PC, Switch',
    note: 4.3,
    synopsis:
      'Un jeu retro-pixel art melant action et exploration dans un univers colore et dynamique.',
    disponible: true,
  },
  {
    id: 6,
    titre: 'Battle Royale Arena',
    categorie: 'Nouveautes',
    genre: 'Multijoueur',
    anneeSortie: 2024,
    plateforme: 'PC, PS5, Xbox',
    note: 4.1,
    synopsis: '100 joueurs, une arene, un seul survivant. Le battle royale ultime.',
    disponible: false,
  },
];

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.template.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly nomApplication = 'WishFlix';
  protected readonly slogan = 'Ton mini Netflix pour apprendre Angular pas a pas.';

  // TODO (Seance 1 - Signals): creer un signal pour stocker la liste des jeux
  // Exemple: protected readonly jeux = signal<JeuCatalogue[]>([]);
  // Voir docs/seance-1.md
  // PLACEHOLDER temporaire pour que le template compile:
  protected readonly jeux = (): JeuCatalogue[] => [];

  // TODO (Seance 1 - Signals): creer un signal pour le filtre de disponibilite
  // Exemple: protected readonly afficherSeulementDisponibles = signal(false);
  // Voir docs/seance-1.md
  // PLACEHOLDER temporaire pour que le template compile:
  protected readonly afficherSeulementDisponibles = () => false;

  // TODO (Seance 2 - Signals derives): creer un signal pour les favoris
  // Exemple: protected readonly favoris = signal<number[]>([]);
  // Voir docs/seance-2.md
  // PLACEHOLDER temporaire pour que le template compile:
  protected readonly favoris = () => [];

  // TODO (Seance 1 - computed): creer un computed pour filtrer les jeux visibles
  // Ce computed doit combiner le filtre de disponibilite et le signal jeux
  // Voir docs/seance-1.md
  // PLACEHOLDER temporaire pour que le template compile:
  protected readonly jeuxVisibles = (): JeuCatalogue[] => [];

  // TODO (Seance 2 - computed): creer un computed pour compter les favoris
  // Exemple: protected readonly nombreFavoris = computed(() => this.favoris().length);
  // Voir docs/seance-2.md
  // PLACEHOLDER temporaire pour que le template compile:
  protected readonly nombreFavoris = () => 0;

  // TODO (Seance 1 - event binding): implementer la methode pour basculer le filtre
  // Cette methode doit inverser la valeur du signal afficherSeulementDisponibles
  // Voir docs/seance-1.md
  protected basculerFiltreDisponibilite(): void {
    // Methode volontairement vide pour la progression pedagogique.
  }

  // TODO (Seance 2 - event binding): implementer la methode pour basculer un favori
  // Cette methode doit ajouter ou retirer un jeu de la liste des favoris
  // Voir docs/seance-2.md
  protected basculerFavori(idJeu: number): void {
    void idJeu;
    // Methode volontairement vide pour la progression pedagogique.
  }

  // TODO (Seance 2 - computed): implementer la methode pour verifier si un jeu est en favoris
  // Cette methode doit retourner true si le jeu est dans la liste des favoris
  // Voir docs/seance-2.md
  protected estEnFavoris(idJeu: number): boolean {
    void idJeu;
    return false;
  }

  // TODO (Seance 2): implementer la methode pour reinitialiser les favoris
  // Cette methode doit vider la liste des favoris
  // Voir docs/seance-2.md
  protected reinitialiserFavoris(): void {
    // Methode volontairement vide pour la progression pedagogique.
  }

  // TODO (Seance 1 - exercice): implementer un filtre par genre
  // Cette methode doit filtrer les jeux selon le genre selectionne
  // Voir docs/seance-1.md
  protected appliquerFiltreGenre(genre: GenreJeu | 'Tous'): void {
    void genre;
    // Methode volontairement vide pour la progression pedagogique.
  }

  // TODO (Seance 3 - services): injecter GameService et charger le catalogue depuis l'API
  // Exemple: private gameService = inject(GameService);
  // Puis: this.jeux = toSignal(this.gameService.getGames(), { initialValue: [] });
  // Voir docs/seance-3.md
  protected chargerCatalogueDepuisService(): void {
    // Methode volontairement vide pour la progression pedagogique.
  }
}
