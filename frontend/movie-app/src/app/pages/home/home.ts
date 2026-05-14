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

  constructor(
    private movieService: MovieService
  ) {

    this.filmes =
      this.movieService.getMovies();

  }

}