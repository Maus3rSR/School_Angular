import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

type GenreFilm = 'Action' | 'Science-fiction' | 'Comedie' | 'Drame' | 'Animation';

interface FilmCatalogue {
  id: number;
  titre: string;
  categorie: 'Tendance' | 'Classiques';
  genre: GenreFilm;
  anneeSortie: number;
  dureeMinutes: number;
  note: number;
  synopsis: string;
  disponible: boolean;
}

const CATALOGUE_INITIAL: FilmCatalogue[] = [
  {
    id: 1,
    titre: 'Neon District',
    categorie: 'Tendance',
    genre: 'Science-fiction',
    anneeSortie: 2023,
    dureeMinutes: 118,
    note: 4.5,
    synopsis:
      'Une equipe improvisee infiltre une ville futuriste pour stopper une IA hors de controle.',
    disponible: true,
  },
  {
    id: 2,
    titre: 'Mission Atlas',
    categorie: 'Tendance',
    genre: 'Action',
    anneeSortie: 2022,
    dureeMinutes: 109,
    note: 4.2,
    synopsis:
      'Un ancien pilote revient sur le terrain pour proteger une station orbitale en danger.',
    disponible: true,
  },
  {
    id: 3,
    titre: 'Week-end a Marseille',
    categorie: 'Tendance',
    genre: 'Comedie',
    anneeSortie: 2021,
    dureeMinutes: 95,
    note: 3.9,
    synopsis: 'Trois amis pensent vivre un week-end calme... jusqu a ce que tout parte en vrille.',
    disponible: false,
  },
  {
    id: 4,
    titre: 'Dernier Hiver',
    categorie: 'Classiques',
    genre: 'Drame',
    anneeSortie: 2018,
    dureeMinutes: 124,
    note: 4.1,
    synopsis: 'Un pere et sa fille traversent une crise familiale au coeur des Alpes enneigees.',
    disponible: true,
  },
  {
    id: 5,
    titre: 'Pixel Racers',
    categorie: 'Classiques',
    genre: 'Animation',
    anneeSortie: 2019,
    dureeMinutes: 101,
    note: 4,
    synopsis:
      'Dans un monde de jeux video, une pilote debutante reve de gagner le grand championnat.',
    disponible: true,
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
  protected readonly progression = 'Seance 1 sur 5';

  protected readonly films = signal<FilmCatalogue[]>(CATALOGUE_INITIAL);
  protected readonly afficherSeulementDisponibles = signal(true);
  protected readonly favoris = signal<number[]>([]);

  protected readonly filmsVisibles = computed(() => {
    const listeFilms = this.films();

    if (!this.afficherSeulementDisponibles()) {
      return listeFilms;
    }

    return listeFilms.filter((film) => film.disponible);
  });

  protected readonly nombreFavoris = computed(() => this.favoris().length);

  protected basculerFiltreDisponibilite(): void {
    this.afficherSeulementDisponibles.update((valeurActuelle) => !valeurActuelle);
  }

  protected basculerFavori(idFilm: number): void {
    this.favoris.update((listeActuelle) => {
      if (listeActuelle.includes(idFilm)) {
        return listeActuelle.filter((id) => id !== idFilm);
      }

      return [...listeActuelle, idFilm];
    });
  }

  protected estEnFavoris(idFilm: number): boolean {
    return this.favoris().includes(idFilm);
  }

  protected reinitialiserFavoris(): void {
    this.favoris.set([]);
  }

  // TODO (Seance 2 - binding d'evenements): ajouter un filtre par genre.
  // Voir docs/seance-2.md
  protected appliquerFiltreGenre(genre: GenreFilm | 'Tous'): void {
    void genre;
  }

  // TODO (Seance 4 - services + routing): deplacer le catalogue dans un service injecte.
  // Voir docs/seance-4.md
  protected chargerCatalogueDepuisService(): void {
    // Methode volontairement vide pour la progression pedagogique.
  }
}
