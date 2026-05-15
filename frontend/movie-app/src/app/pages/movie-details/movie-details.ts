import { Component,
  OnInit,
  ChangeDetectorRef
 } from '@angular/core';

import {
  NgIf,
  NgClass,
  NgFor,
} from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { Movie } from '../../models/movie';

import { Location } from '@angular/common';

import { FavoriteService } from '../../services/favorite.service';

import { RatingService } from '../../services/rating.service';

import { WatchlistService } from '../../services/watchlist.service';

import { UserService } from '../../services/user.service';

import { ReviewService } from '../../services/review.service';

import { FormsModule } from '@angular/forms';

import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-movie-details',
  imports: [
    NgIf,
    NgClass,
    NgFor,
    FormsModule,
    RouterLink
  ],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails {

  filme: any;
  favorito = false;
  notaUsuario = 0;
  estrelas = [1, 2, 3, 4, 5];
  naWatchlist = false;
  usuarioLogado = false;
  mensagem = '';
  comentario = '';
  reviews: any[] = [];
  editandoIndex = -1;
  resposta = '';
  limiteCaracteres = 500;
  mostrarTrailer = false;
  abaAtual = 'detalhes';
  recomendados:any[] = [];

  constructor(

    private route: ActivatedRoute,

    private location: Location,

    private favoriteService: FavoriteService,

    private ratingService: RatingService,

    private watchlistService: WatchlistService,

    private userService: UserService,

    private reviewService: ReviewService,

    private tmdbService: TmdbService,
    private cdr: ChangeDetectorRef

  ) {

    this.usuarioLogado =
      this.userService.isLoggedIn();

    const id =
      Number(
        this.route.snapshot
          .paramMap.get('id')
      );

    // 🎬 DETALHES DO FILME

    this.tmdbService
      .getMovieDetails(id)

      .subscribe({

        next: (res:any) => {

          console.log(res);
          this.filme = res;
          this.cdr.detectChanges();

          // 🎭 ELENCO

          this.tmdbService
            .getMovieCredits(id)

            .subscribe({

              next: (credits:any) => {

                this.filme.atores =
                  credits.cast.slice(0, 10);

              }

            });

          // ⭐ FAVORITOS / WATCHLIST / RATING

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

          // 📝 REVIEWS

          this.reviews =

            this.reviewService
              .getReviews(
                this.filme.id
              );

        }

      });

    // 🔥 RECOMENDAÇÕES

    this.tmdbService
      .getRecommendations(id)

      .subscribe({

        next: (res:any) => {

          this.recomendados =
            res.results.slice(0, 6);

        }

      });

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

  adicionarComentario() {

    if(!this.usuarioLogado) {

      this.mensagem =
        'Faça login para comentar';

      setTimeout(() => {

        this.mensagem = '';

      }, 3000);

      return;

    }

    if(
      !this.comentario.trim()
    ) {

      return;

    }

    const usuario =
      this.userService.getUsuario();

    const review = {

      nome: usuario.nome,

      comentario:
        this.comentario,

      nota:
        this.notaUsuario,

      data:
        new Date()
          .toLocaleString(),

      respostas: [],

      likes: 0,

      usuariosLikes: []

    };

    if(this.filme) {

      if(this.editandoIndex >= 0) {

        this.reviews[
          this.editandoIndex
        ].comentario =
          this.comentario;

        this.reviews[
          this.editandoIndex
        ].editado = true;

        this.editandoIndex = -1;

      } else {

        this.reviewService
          .adicionarReview(

            this.filme.id,

            review

          );

        this.reviews =
          this.reviewService
            .getReviews(
              this.filme.id
            );

      }

      localStorage.setItem(

        'reviews_' +
        this.filme.id,

        JSON.stringify(
          this.reviews
        )

      );

      this.comentario = '';

    }

  }

  editarReview(
    index:number
  ) {

    this.comentario =
      this.reviews[index]
        .comentario;

    this.editandoIndex =
      index;

  }

  eliminarReview(
    index:number
  ) {

    this.reviews.splice(
      index,
      1
    );

    if(this.filme) {

      localStorage.setItem(

        'reviews_' +
        this.filme.id,

        JSON.stringify(
          this.reviews
        )

      );

    }

  }

  responderReview(
    index:number
  ) {

    if(
      !this.resposta.trim()
    ) {

      return;

    }

    const usuario =
      this.userService
        .getUsuario();

    this.reviews[index]
      .respostas
      .push({

        nome: usuario.nome,

        texto:
          this.resposta

      });

    if(this.filme) {

      localStorage.setItem(

        'reviews_' +
        this.filme.id,

        JSON.stringify(
          this.reviews
        )

      );

    }

    this.resposta = '';

  }

  darLike(
    index:number
  ) {

    const usuario =
      this.userService
        .getUsuario();

    if(!usuario) {

      this.mensagem =
        'Faça login para dar like';

      setTimeout(() => {

        this.mensagem = '';

      }, 3000);

      return;

    }

    const review =
      this.reviews[index];

    const jaDeuLike =

      review.usuariosLikes
        .includes(usuario.email);

    if(jaDeuLike) {

      review.likes--;

      review.usuariosLikes =

        review.usuariosLikes
          .filter(
            (email:string) =>

              email !== usuario.email
          );

    } else {

      review.likes++;

      review.usuariosLikes
        .push(usuario.email);

    }

    if(this.filme) {

      localStorage.setItem(

        'reviews_' +
        this.filme.id,

        JSON.stringify(
          this.reviews
        )

      );

    }

  }

  abrirTrailer() {

    this.mostrarTrailer = true;

  }

  fecharTrailer() {

    this.mostrarTrailer = false;

  }

  trocarAba(
    aba:string
  ) {

    this.abaAtual = aba;

  }

}