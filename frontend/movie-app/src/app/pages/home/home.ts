import { Component } from '@angular/core';

import { NgFor } from '@angular/common';

import { MovieService } from '../../services/movie.service';

import { Movie } from '../../models/movie';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgFor, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  filmes: Movie[] = [];
  filmeAtual!: Movie;
  indiceAtual = 0;

  constructor(
    private movieService: MovieService
  ) {

    this.filmes =
      this.movieService.getMovies();

    this.filmeAtual =
      this.filmes[0];

    setInterval(() => {

      this.proximoBanner();
  
    }, 5000);

  }

  proximoBanner() {

    this.indiceAtual++;

    if(
      this.indiceAtual >=
      this.filmes.length
    ) {

      this.indiceAtual = 0;

    }

    this.filmeAtual =
      this.filmes[this.indiceAtual];

  }
}