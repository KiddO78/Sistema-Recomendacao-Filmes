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

  mensagem = '';

  constructor(private authService: AuthService) {}

  register() {

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

}