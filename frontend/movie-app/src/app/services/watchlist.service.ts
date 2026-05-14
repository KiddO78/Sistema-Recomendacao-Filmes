import { Injectable } from '@angular/core';

import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  watchlist: Movie[] = [];

  constructor() {

    const dados =
      localStorage.getItem(
        'watchlist'
      );

    if(dados) {

      this.watchlist =
        JSON.parse(dados);

    }

  }

  getWatchlist() {

    return this.watchlist;

  }

  isWatchlist(id:number) {

    return this.watchlist.some(
      filme => filme.id === id
    );

  }

  toggleWatchlist(
    filme:Movie
  ) {

    if(this.isWatchlist(filme.id)) {

      this.watchlist =
        this.watchlist.filter(
          f => f.id !== filme.id
        );

    } else {

      this.watchlist.push(filme);

    }

    localStorage.setItem(
      'watchlist',
      JSON.stringify(this.watchlist)
    );

  }

}