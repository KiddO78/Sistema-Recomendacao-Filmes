import { Injectable } from '@angular/core';

import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favoritos: Movie[] = [];

  constructor() {

    const dados =
      localStorage.getItem('favoritos');

    if(dados) {

      this.favoritos =
        JSON.parse(dados);

    }

  }

  getFavoritos() {

    return this.favoritos;

  }

  isFavorito(id:number) {

    return this.favoritos.some(
      filme => filme.id === id
    );

  }

  toggleFavorito(filme:Movie) {

    if(this.isFavorito(filme.id)) {

      this.favoritos =
        this.favoritos.filter(
          f => f.id !== filme.id
        );

    } else {

      this.favoritos.push(filme);

    }

    localStorage.setItem(
      'favoritos',
      JSON.stringify(this.favoritos)
    );

  }

}