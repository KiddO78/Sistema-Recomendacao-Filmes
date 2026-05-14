import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    usuarioAtual = new BehaviorSubject<any>(this.getUsuario());

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

    localStorage.removeItem(
        'usuario'
    );

    this.usuarioAtual.next(null);

  }

  salvarUsuario(usuario:any) {

    localStorage.setItem(
        'usuario',
        JSON.stringify(usuario)
    );

    this.usuarioAtual.next(usuario);

  }
}