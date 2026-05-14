import { Component } from '@angular/core';

import {
  NgFor,
  NgIf
} from '@angular/common';

import { RouterLink } from '@angular/router';

import { FavoriteService } from '../../services/favorite.service';

import { Movie } from '../../models/movie';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-favorites',
  imports: [
    NgFor,
    NgIf,
    RouterLink
  ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites {

  favoritos: Movie[] = [];

  usuarioLogado = false;

  constructor(

    private favoriteService: FavoriteService,

    private userService: UserService

  ) {

    this.usuarioLogado =
      this.userService.isLoggedIn();

    if(this.usuarioLogado) {

      this.favoritos =
        this.favoriteService
          .getFavoritos();

    }

  }

}