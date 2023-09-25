import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CustomizeService } from "../custom-bouquets/customize.service";
import { Review } from "./review.model";




@Injectable({providedIn:"root"})
export class ReviewS {

    reviewsChanged = new Subject<Review[]>();

    reviewSelected = new EventEmitter<Review>();

    public reviews: Review[] = [];

    constructor() { }



    setReviews(reviews: Review[]) {
        this.reviews = reviews;
   
    }
    getReviews() {
        return this.reviews.slice();
    }

    addReview(form: Review) {
        this.reviews.push(form);

    }


}