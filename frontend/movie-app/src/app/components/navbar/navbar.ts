import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  usuario:any = null;
  pesquisa = '';

  constructor( private userService: UserService) {

    this.usuario = this.userService.getUsuario();

  }

  logout() {

    this.userService.logout();

    location.reload();

  }

}