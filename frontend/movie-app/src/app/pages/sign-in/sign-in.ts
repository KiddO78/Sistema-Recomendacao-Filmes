import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { NgIf } from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {

  email = '';

  senha = '';

  erro = '';

  mostrarSenha = false;

  lembrarMe = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSenha() {

    this.mostrarSenha =
      !this.mostrarSenha;

  }

  login() {

    this.erro = '';

    const dados = {

      email: this.email,
      senha: this.senha

    };

    this.authService.login(dados)
    .subscribe({

      next: (res:any) => {

        if(res.success) {

          localStorage.setItem(
            'usuario',
            JSON.stringify(res.usuario)
          );

          this.router.navigate(['/']);

        } else {

          this.erro =
            res.mensagem;

        }

      },

      error: () => {

        this.erro =
          'Erro no servidor';

      }

    });

  }

}