import { Component } from '@angular/core';

import { NgFor } from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { MovieService } from '../../services/movie.service';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-search',
  imports: [
    NgFor,
    RouterLink
  ],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {

  filmes: Movie[] = [];

  termo = '';

  constructor(

    private route: ActivatedRoute,

    private movieService: MovieService

  ) {

    this.termo =
      this.route.snapshot.paramMap.get('termo') || '';

    this.filmes =
      this.movieService.searchMovies(
        this.termo
      );

  }

}