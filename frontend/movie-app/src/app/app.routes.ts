import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { SignIn } from './pages/sign-in/sign-in';
import { Movies } from './pages/movies/movies';
import { MovieDetails } from './pages/movie-details/movie-details';
import { Favorites } from './pages/favorites/favorites';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'sign-in',
    component: SignIn
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'movies',
    component: Movies
  },

  {
    path: 'movie/:id',
    component: MovieDetails
  },

  {
    path: 'favorites',
    component: Favorites
  },

  {
    path: 'dashboard',
    component: Dashboard
  }

];