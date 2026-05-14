import { 
  Component,
  OnInit } from '@angular/core';

import { NgFor } from '@angular/common';

import { RouterLink } from '@angular/router';

import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-home',
  imports: [NgFor, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  filmeAtual:any = null;
  trendingMovies:any[] = [];
  bannerAtual = 0;
  banners:any[] = [];
  intervaloBanner:any;

  constructor(
    private tmdbService: TmdbService
  ) {}

  proximoBanner() {

    this.bannerAtual++;

    if(
      this.bannerAtual >=
      this.trendingMovies.length
    ) {

      this.bannerAtual = 0;

    }

    this.filmeAtual =

      this.trendingMovies[
        this.bannerAtual
      ];

  }

  selecionarBanner(
    index:number
  ) {

    this.bannerAtual =
      index;

    this.filmeAtual =
      this.trendingMovies[index];

  }

  ngOnInit(): void {

    this.carregarTrending();

  }

  carregarTrending() {

    this.tmdbService
      .getTrendingMovies()

      .subscribe({

        next: (res:any) => {

          this.trendingMovies =
            res.results;

          this.banners =
            res.results;

          if(
            this.trendingMovies.length > 0
          ) {

            this.filmeAtual =
              this.trendingMovies[0];

          }

          this.intervaloBanner =

            setInterval(() => {

              this.proximoBanner();

            }, 5000);

        },

      });

  }
}