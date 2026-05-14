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
            'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',

        trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E',

        thumbnail:
            'https://img.youtube.com/vi/zSWdZVtXT7E/maxresdefault.jpg',

        atores: [

            {

                id: 1,

                nome: 'Matthew McConaughey',

                personagem: 'Cooper',

                foto:
                'https://image.tmdb.org/t/p/w500/nA9qhLw74Q8Ifs4K43gmX18sHHo.jpg',

                bio:
                'Ator americano vencedor do Oscar.'

            },

            {

                id: 2,

                nome: 'Anne Hathaway',

                personagem: 'Brand',

                foto:
                'https://image.tmdb.org/t/p/w500/tLelKoPNiyJCSEtQTz1FGv4TLGc.jpg',

                bio:
                'Atriz americana conhecida por Interestelar.'

            },

            {

                id: 3,

                nome: 'Jessica Chastain',

                personagem: 'Murph',

                foto:
                'https://image.tmdb.org/t/p/w500/od9DbtPomeroyzM9v2hW9fZLH1.jpg',

                bio:
                'Atriz americana indicada ao Oscar.'

            }

        ],
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
            'https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',

        trailer: 'https://www.youtube.com/embed/mqqft2x_Aa4',

        thumbnail:
            'https://img.youtube.com/vi/mqqft2x_Aa4/maxresdefault.jpg',

        atores: [

            {

                id: 6,

                nome: 'Robert Pattinson',

                personagem: 'Bruce Wayne',

                foto:
                'https://image.tmdb.org/t/p/w500/3s9fB40nDuQKAnQvVF2m7XZFTY.jpg',

                bio:
                'Ator britânico conhecido por Batman.'

            },

            {

                id: 7,

                nome: 'Zoë Kravitz',

                personagem: 'Catwoman',

                foto:
                'https://image.tmdb.org/t/p/w500/jmA8P7j4M3kqf6Jw6iV06P88GJE.jpg',

                bio:
                'Atriz e cantora americana.'

            }

        ],    
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
            'https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg',

        trailer: 'https://www.youtube.com/embed/zAGVQLHvwOY',

        thumbnail:
            'https://img.youtube.com/vi/zAGVQLHvwOY/maxresdefault.jpg',

        atores: [

            {

                id: 4,

                nome: 'Joaquin Phoenix',

                personagem: 'Arthur Fleck',

                foto:
                'https://image.tmdb.org/t/p/w500/ojXrPW8Uo9zjR4Kj8nQn5hN5Q.jpg',

                bio:
                'Ator vencedor do Oscar por Joker.'

            },

            {

                id: 5,

                nome: 'Robert De Niro',

                personagem: 'Murray Franklin',

                foto:
                'https://image.tmdb.org/t/p/w500/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg',

                bio:
                'Lendário ator americano.'

            }

        ],

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

    getTrendingMovies() {

        return this.filmes
            .slice(0, 8);

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