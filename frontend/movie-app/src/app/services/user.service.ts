import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsuario() {

    const usuario =
      localStorage.getItem('usuario');

    if(usuario) {

      return JSON.parse(usuario);

    }

    return null;

  }

  isLoggedIn() {

    return this.getUsuario() !== null;

  }

  logout() {

    localStorage.removeItem('usuario');

  }

}