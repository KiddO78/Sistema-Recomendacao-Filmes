import { Component } from '@angular/core';

import { NgFor } from '@angular/common';

import { RouterLink } from '@angular/router';

import { WatchlistService } from '../../services/watchlist.service';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-watchlist',
  imports: [
    NgFor,
    RouterLink
  ],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css'
})
export class Watchlist {

  filmes: Movie[] = [];

  constructor(
    private watchlistService: WatchlistService
  ) {

    this.filmes =
      this.watchlistService.getWatchlist();

  }

}