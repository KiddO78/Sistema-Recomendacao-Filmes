import { Injectable } from '@angular/core';

import { Movie } from '../models/movie';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  watchlist: Movie[] = [];

  constructor(
    private userService: UserService
  ) {

    const usuario =
      this.userService.getUsuario();

    if(usuario) {

      const chave =
        'watchlist_' + usuario.email;

      const dados =
        localStorage.getItem(chave);

      if(dados) {

        this.watchlist =
          JSON.parse(dados);

      }

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

    const usuario =
      this.userService.getUsuario();

    if(usuario) {

      localStorage.setItem(

        'watchlist_' + usuario.email,

        JSON.stringify(this.watchlist)

      );

    }

  }

}