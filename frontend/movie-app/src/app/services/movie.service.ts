import { Injectable } from '@angular/core';

import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  filmes: Movie[] = [

    {

      id: 1,

      titulo: 'Interstellar',

      descricao:
        'Uma viagem pelo espaço para salvar a humanidade.',

      genero: 'Ficção Científica',

      ano: 2014,

      nota: 8.7,

      poster:
        'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',

      banner:
        'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg'

    },

    {

      id: 2,

      titulo: 'The Dark Knight',

      descricao:
        'Batman enfrenta o Coringa em Gotham.',

      genero: 'Ação',

      ano: 2008,

      nota: 9.0,

      poster:
        'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',

      banner:
        'https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg'

    },

    {

      id: 3,

      titulo: 'Joker',

      descricao:
        'A origem sombria do Coringa.',

      genero: 'Drama',

      ano: 2019,

      nota: 8.4,

      poster:
        'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',

      banner:
        'https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg'

    }

  ];

  getMovies() {

    return this.filmes;

  }

    getMovieById(id:number) {

        return this.filmes.find(
            filme => filme.id === id
        );

    }

    searchMovies(termo:string) {

        return this.filmes.filter(filme =>

            filme.titulo
            .toLowerCase()
            .includes(
                termo.toLowerCase()
            )

        );

    }

    getGeneros() {

        return [

            'Todos',

            'Ação',

            'Drama',

            'Ficção Científica'

        ];

    }
}