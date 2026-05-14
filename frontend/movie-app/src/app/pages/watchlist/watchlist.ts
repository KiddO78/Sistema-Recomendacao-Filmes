import { Component } from '@angular/core';

import {
  NgFor,
  NgIf
} from '@angular/common';

import { RouterLink } from '@angular/router';

import { WatchlistService } from '../../services/watchlist.service';

import { Movie } from '../../models/movie';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-watchlist',
  imports: [
    NgFor,
    NgIf,
    RouterLink
  ],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css'
})
export class Watchlist {

  filmes: Movie[] = [];

  usuarioLogado = false;

  constructor(

    private watchlistService: WatchlistService,

    private userService: UserService

  ) {

    this.usuarioLogado =
      this.userService.isLoggedIn();

    if(this.usuarioLogado) {

      this.filmes =
        this.watchlistService
          .getWatchlist();

    }

  }

}