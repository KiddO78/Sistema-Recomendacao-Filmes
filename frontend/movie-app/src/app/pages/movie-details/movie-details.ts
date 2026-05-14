import { Component } from '@angular/core';

import { NgIf } from '@angular/common';

import {
  ActivatedRoute
} from '@angular/router';

import { MovieService } from '../../services/movie.service';

import { Movie } from '../../models/movie';

import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  imports: [NgIf],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails {

  filme?: Movie;

  constructor(

    private route: ActivatedRoute,

    private movieService: MovieService,

    private location: Location

  ) {

    const id =
      Number(this.route.snapshot.paramMap.get('id'));

    this.filme =
      this.movieService.getMovieById(id);

  }

  voltar() {

    this.location.back();

  }

}