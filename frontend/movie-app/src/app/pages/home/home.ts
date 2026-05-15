import { 
  Component,
  OnInit,
  ChangeDetectorRef
 } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';

import { RouterLink } from '@angular/router';

import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-home',
  imports: [NgFor, NgIf, RouterLink],
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
    private tmdbService: TmdbService,
    private cdr: ChangeDetectorRef
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
    this.cdr.detectChanges();

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

            res.results.filter(

              (filme:any) =>

                filme.poster_path &&
                filme.backdrop_path &&
                filme.title

            );

          this.banners =
            this.trendingMovies;

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