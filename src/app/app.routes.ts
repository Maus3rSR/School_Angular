import { Routes } from '@angular/router';

import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../features/home/home.page').then((m) => m.HomePage),
    title: 'WishFlix - Accueil',
  },
  {
    path: 'games/:id',
    loadComponent: () =>
      import('../features/game-detail/game-detail.page').then((m) => m.GameDetailPage),
    title: 'WishFlix - Detail',
  },
  {
    path: 'wishlist',
    canActivate: [authGuard],
    loadComponent: () => import('../features/wishlist/wishlist.page').then((m) => m.WishlistPage),
    title: 'WishFlix - Wishlist',
  },
  {
    path: 'login',
    loadComponent: () => import('../features/login/login.page').then((m) => m.LoginPage),
    title: 'WishFlix - Connexion',
  },
  {
    path: '**',
    loadComponent: () => import('../features/not-found/not-found.page').then((m) => m.NotFoundPage),
    title: 'WishFlix - Introuvable',
  },
];
