import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor() {}

  getReviews(
    filmeId:number
  ) {

    const reviews =
      localStorage.getItem(
        'reviews_' + filmeId
      );

    return reviews
      ? JSON.parse(reviews)
      : [];

  }

  adicionarReview(

    filmeId:number,

    review:any

  ) {

    const reviews =
      this.getReviews(filmeId);

    reviews.push(review);

    localStorage.setItem(

      'reviews_' + filmeId,

      JSON.stringify(reviews)

    );

  }

}