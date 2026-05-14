import { Component } from '@angular/core';
import { 
  NgIf,
  NgClass,
  NgFor
 } from '@angular/common';

import {
  ActivatedRoute
} from '@angular/router';

import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { Location } from '@angular/common';
import { FavoriteService } from '../../services/favorite.service';
import { RatingService } from '../../services/rating.service';
import { WatchlistService } from '../../services/watchlist.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-movie-details',
  imports: [NgIf, NgClass, NgFor],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails {

  filme?: Movie;
  favorito = false;
  notaUsuario = 0;
  estrelas = [1, 2, 3, 4, 5];
  naWatchlist = false;
  usuarioLogado = false;
  mensagem = '';

  constructor(

    private route: ActivatedRoute,

    private movieService: MovieService,

    private location: Location,

    private favoriteService: FavoriteService,

    private ratingService: RatingService,

    private watchlistService: WatchlistService,

    private userService: UserService

  ) {

    this.usuarioLogado =
      this.userService.isLoggedIn();

    const id =
      Number(
        this.route.snapshot
          .paramMap.get('id')
      );

    this.filme =
      this.movieService
        .getMovieById(id);

    if(
      this.filme &&
      this.usuarioLogado
    ) {

      this.favorito =
        this.favoriteService
          .isFavorito(
            this.filme.id
          );

      this.naWatchlist =

        this.watchlistService
          .isWatchlist(
            this.filme.id
          );

      this.notaUsuario =

        this.ratingService
          .getNota(
            this.filme.id
          );

    }

  }

  voltar() {

    this.location.back();

  }

  toggleFavorito() {

    if(!this.usuarioLogado) {

      this.mensagem =
        'Inicie Sessão para favoritar filmes';

      setTimeout(() => {

        this.mensagem = '';

      }, 3000);

      return;

    }

    if(this.filme) {

      this.favoriteService
        .toggleFavorito(this.filme);

      this.favorito =
        !this.favorito;

    }

  }

  avaliar(
    nota:number
  ) {

    if(!this.usuarioLogado) {

      this.mensagem =
        'Inicie Sessão para avaliar filmes';

      setTimeout(() => {

        this.mensagem = '';

      }, 3000);

      return;

    }

    if(this.notaUsuario === nota) {

      this.notaUsuario = 0;

    } else {

      this.notaUsuario = nota;

    }

    if(this.filme) {

      this.ratingService
        .avaliarFilme(
          this.filme.id,
          this.notaUsuario
        );

    }

  }

  toggleWatchlist() {

    if(!this.usuarioLogado) {

      this.mensagem =
        'Inicie Sessão para usar a watchlist';

      setTimeout(() => {

        this.mensagem = '';

      }, 3000);

      return;

    }

    if(this.filme) {

      this.watchlistService
        .toggleWatchlist(
          this.filme
        );

      this.naWatchlist =
        !this.naWatchlist;

    }

  }

}