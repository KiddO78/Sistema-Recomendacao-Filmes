import { 
  Component,
  OnInit
 } from '@angular/core';
import {
  RouterLink,
  Router
} from '@angular/router';
import { 
  NgIf,
  NgFor
 } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf, NgFor, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  usuario:any = null;
  pesquisa = '';
  resultados:any[] = [];

  constructor( 
    private userService: UserService, 
    private router: Router, 
    private movieService: MovieService
  ) {
    this.userService.
      usuarioAtual.
      subscribe(usuario => {
        
      this.usuario = usuario;
    });
  }

  logout() {

    this.userService.logout();

    this.usuario = null;

    this.router.navigate(['/']);

  }

  pesquisar() {

    if(
      this.pesquisa.trim()
    ) {

      this.router.navigate([
        '/search',
        this.pesquisa
      ]);

    }

  }

  buscarSugestoes() {

    if(
      this.pesquisa.trim()
    ) {

      this.resultados =
        this.movieService
          .searchMovies(
            this.pesquisa
          );

    } else {

      this.resultados = [];

    }

  }

}