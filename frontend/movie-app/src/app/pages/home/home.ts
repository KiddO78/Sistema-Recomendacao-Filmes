import { Component } from '@angular/core';

import { NgFor } from '@angular/common';

import { MovieService } from '../../services/movie.service';

import { Movie } from '../../models/movie';

import { RouterLink } from '@angular/router';

import { TmdbService } from '../../services/tmdb.service';

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
  trendingMovies:any[] = [];
  bannerAtual = 0;
  banners:any[] = [];

  constructor(
    private movieService: MovieService,
    private tmdbService: TmdbService
  ) {

    this.filmes =
      this.movieService.getMovies();

    this.filmeAtual =
      this.filmes[0];

    setInterval(() => {

      this.proximoBanner();
  
    }, 5000);

    this.trendingMovies =
      this.movieService
        .getTrendingMovies();

    this.banners =
      this.movieService
        .getMovies();    

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

  getTrendingMovies() {

    return this.filmes
      .slice(0, 8);

  }

  selecionarBanner(
    index:number
  ) {

    this.bannerAtual =
      index;

    this.filmeAtual =
      this.banners[index];

  }

  ngOnInit() {

    this.tmdbService
      .getTrendingMovies()

      .subscribe(

        (res:any) => {

          console.log(res);

        }

      );

  }
}