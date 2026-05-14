import { Injectable } from '@angular/core';

import { Movie } from '../models/movie';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favoritos: Movie[] = [];

  constructor(
    private userService: UserService
  ) {

    const usuario =
      this.userService.getUsuario();

    if(usuario) {

      const chave =
        'favoritos_' + usuario.email;

      const dados =
        localStorage.getItem(chave);

      if(dados) {

        this.favoritos =
          JSON.parse(dados);

      }

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

    const usuario =
      this.userService.getUsuario();

    if(usuario) {

      localStorage.setItem(

        'favoritos_' + usuario.email,

        JSON.stringify(this.favoritos)

      );

    }

  }

}