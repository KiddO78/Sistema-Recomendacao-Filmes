import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  nome = '';
  email = '';
  senha = '';
  mostrarSenha = false;
  confirmarSenha = '';
  mostrarConfirmarSenha = false;
  forcaSenha = '';
  mensagem = '';
  erro = '';

  constructor(private authService: AuthService) {}

  register() {

    if(this.senha !== this.confirmarSenha) {

      this.erro = 'As senhas não coincidem';
      return;

    }

    const dados = {

      nome: this.nome,
      email: this.email,
      senha: this.senha

    };

    this.authService.register(dados)
    .subscribe({

      next: (res:any) => {

        if(res.success) {

          this.mensagem =
            'Conta criada com sucesso!';

        }

      },

      error: () => {

        this.mensagem =
          'Erro ao registrar utilizador';

      }

    });

  }

  toggleSenha() {

    this.mostrarSenha = !this.mostrarSenha;
  }

  toggleConfirmarSenha() {

    this.mostrarConfirmarSenha = !this.mostrarConfirmarSenha;

  }

  verificarForcaSenha() {

    const senha = this.senha;

    const temMaiuscula =
      /[A-Z]/.test(senha);

    const temMinuscula =
      /[a-z]/.test(senha);

    const temNumero =
      /[0-9]/.test(senha);

    const temEspecial =
      /[^A-Za-z0-9]/.test(senha);

    if(
      senha.length >= 8 &&
      temMaiuscula &&
      temMinuscula &&
      temNumero &&
      temEspecial
    ) {

      this.forcaSenha = 'Forte';

    }

    else if(
      senha.length >= 6 &&
      (temMaiuscula || temNumero)
    ) {

      this.forcaSenha = 'Média';

    }

    else {

      this.forcaSenha = 'Fraca';

    }

  }

}