import { Routes } from '@angular/router';

import { authGuard } from '../features/auth/auth.guard';
import { HomePage } from '../pages/home/home.page';
import { GameDetailPage } from '../pages/game-detail/game-detail.page';
import { WishlistPage } from '../pages/wishlist/wishlist.page';
import { LoginPage } from '../pages/login/login.page';
import { NotFoundPage } from '../pages/not-found/not-found.page';

/**
 * Routing Angular: tableau central des URLs, composants cibles et protections d'accès.
 * canActivate branche un guard déclaratif, ce qui évite de dupliquer des checks dans chaque page.
 * Dans WishFlix, le flux est lisible: catalogue public, wishlist privée, fallback 404 explicite.
 * Pour aller plus loin: https://angular.dev/guide/routing/define-routes
 */
export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'WishFlix - Accueil',
  },
  {
    path: 'games/:id',
    component: GameDetailPage,
    title: 'WishFlix - Detail',
  },
  {
    path: 'wishlist',
    canActivate: [authGuard],
    component: WishlistPage,
    title: 'WishFlix - Wishlist',
  },
  {
    path: 'login',
    component: LoginPage,
    title: 'WishFlix - Connexion',
  },
  {
    path: '**',
    component: NotFoundPage,
    title: 'WishFlix - Introuvable',
  },
];
