import { Component } from '@angular/core';

import { 
  NgFor,
  NgClass } from '@angular/common';

import { RouterLink } from '@angular/router';

import { MovieService } from '../../services/movie.service';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movies',
  imports: [
    NgFor,
    NgClass,
    RouterLink
  ],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies {

  filmes: Movie[] = [];
  generos:string[] = [];

  generoSelecionado = 'Todos';

  constructor(
    private movieService: MovieService
  ) {

    this.filmes =
      this.movieService.getMovies();

    this.generos =
      this.movieService.getGeneros();

  }

  filtrarGenero(
    genero:string
  ) {

    this.generoSelecionado =
      genero;

    if(genero === 'Todos') {

      this.filmes =
        this.movieService.getMovies();

    } else {

      this.filmes =
        this.movieService
          .getMovies()
          .filter(
            filme =>
              filme.genero === genero
          );

    }

  }

}