import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private apiUrl =

    'https://api.themoviedb.org/3';

  private token =

    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQ5N2U3Y2Q1N2I2MTIxMzU0Njk3NzY3ZDk3M2I3OSIsIm5iZiI6MTc3ODc3NjI1OC43MTIsInN1YiI6IjZhMDVmOGMyYTk1MDg4ZTgzMTI5MWNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WBySFXl-navOybiu--Vb4Q1cKxHOUoqPP6IuHBy8gvg';

  constructor(
    private http: HttpClient
  ) {}

  getTrendingMovies() {

    return this.http.get(

      `${this.apiUrl}/trending/movie/week`,

      {

        headers:
          new HttpHeaders({

            Authorization:
              `Bearer ${this.token}`

          })

      }

    );

  }

  getMovieDetails(
    id:number
    ) {

    return this.http.get(

        `${this.apiUrl}/movie/${id}`,

        {

        headers:
            new HttpHeaders({

            Authorization:
                'Bearer ' + this.token

            })

        }

    );

}

getMovieCredits(
  id:number
) {

  return this.http.get(

    `${this.apiUrl}/movie/${id}/credits`,

    {

      headers:
        new HttpHeaders({

          Authorization:
            'Bearer ' + this.token

        })

    }

  );

}

getRecommendations(
  id:number
) {

  return this.http.get(

    `${this.apiUrl}/movie/${id}/recommendations`,

    {

      headers:
        new HttpHeaders({

          Authorization:
            'Bearer ' + this.token

        })

    }

  );

}

getMovieVideos(
  id:number
) {

  return this.http.get(

    `${this.apiUrl}/movie/${id}/videos`,

    {

      headers:
        new HttpHeaders({

          Authorization:
            'Bearer ' + this.token

        })

    }

  );

}

}