import { Routes } from '@angular/router';
import { Home } from '../pages/home/home.component';
import { NotFound } from '../pages/not-found/not-found.component';
import { GameDetail } from '../pages/game-detail/game-detail.component';

// TODO (Seance 4 - routing): declarer ici les routes lazy-loaded vers
// Accueil, DetailFilm, Favoris et NotFound.
// Voir docs/seance-4.md
export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'WishFlix - Accueil',
  },
  {
    path: 'game/:id',
    component: GameDetail,
    title: 'WishFlix - Fiche de jeu',
  },
  {
    path: '**',
    component: NotFound,
    title: "404 - Tu t'es perdu :(",
  },
];
