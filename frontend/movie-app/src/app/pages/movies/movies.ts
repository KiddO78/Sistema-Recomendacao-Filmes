import { Component } from '@angular/core';

import { NgFor } from '@angular/common';

import { RouterLink } from '@angular/router';

import { MovieService } from '../../services/movie.service';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movies',
  imports: [
    NgFor,
    RouterLink
  ],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies {

  filmes: Movie[] = [];

  constructor(
    private movieService: MovieService
  ) {

    this.filmes =
      this.movieService.getMovies();

  }

}