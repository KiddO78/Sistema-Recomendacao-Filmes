import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor() {}

  avaliarFilme(
    filmeId:number,
    nota:number
  ) {

    localStorage.setItem(
      'rating_' + filmeId,
      nota.toString()
    );

  }

  getNota(filmeId:number) {

    const nota =
      localStorage.getItem(
        'rating_' + filmeId
      );

    return nota
      ? Number(nota)
      : 0;

  }

}