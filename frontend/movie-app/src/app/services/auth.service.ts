import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'http://localhost/movie-backend/api';

  constructor(private http: HttpClient) {}

  register(dados:any) {
    return this.http.post(`${this.api}/register.php`, dados);
  }

  login(dados:any) {
    return this.http.post(`${this.api}/login.php`, dados);
}

}