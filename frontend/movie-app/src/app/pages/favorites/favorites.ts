import { Component } from '@angular/core';

import { NgFor } from '@angular/common';

import { RouterLink } from '@angular/router';

import { FavoriteService } from '../../services/favorite.service';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-favorites',
  imports: [
    NgFor,
    RouterLink
  ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites {

  favoritos: Movie[] = [];

  constructor(
    private favoriteService: FavoriteService
  ) {

    this.favoritos =
      this.favoriteService.getFavoritos();

  }

}