import { Injectable, ɵɵngDeclareInjectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Bouquet } from "../bouquets/bouquet.model";
import { BouquetService } from "../bouquets/bouquet.service";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Review } from "./review.model";
import { ReviewS } from "./reviewS.service";


@Injectable({ providedIn: 'root' })

export class DataStorageService {
    constructor(private http: HttpClient,
        private bouquetService: BouquetService,
        private reviewService:ReviewS,
        private authService: AuthService) { }


    storeBouquets(bouquet: Bouquet) {
        const bouquets = this.bouquetService.getBouquets();

        this.http.post('https://florarie-aa181-default-rtdb.europe-west1.firebasedatabase.app/bouquets.json', bouquet).subscribe(
            response => {
                console.log(response);
            });

    }


    storeReviews() {
        const reviews = this.reviewService.getReviews();

        this.http.put('https://florarie-aa181-default-rtdb.europe-west1.firebasedatabase.app/reviews.json', reviews).subscribe(
            response => {
                console.log(response);
            });

    }


    
    fetchReviews() {
        return this.http
            .get<Review[]>(
                'https://florarie-aa181-default-rtdb.europe-west1.firebasedatabase.app/reviews.json',

            ).pipe(map(reviews => {
             

                let reviewsArray: Review[] = [];
                let reviewObject = Object.keys(reviews);//face un array cu proprietatile lui

                for (let i = 0; i < reviewObject.length; i++) {
                    reviewsArray.push(reviews[reviewObject[i]]);// iau valoarea si o adaug in array
                    reviewsArray[i].key = reviewObject[i];


                }

                //console.log(bouquetArray);
                return reviewsArray.map(review => {
                    return {
                        ...review,
                    };
                });
            }),
                tap(reviews => {
                    this.reviewService.setReviews(reviews);
                })
            );

    }


    fetchBouquets() {
        return this.http
            .get<Bouquet[]>(
                'https://florarie-aa181-default-rtdb.europe-west1.firebasedatabase.app/bouquets.json',

            ).pipe(map(bouquets => {
                //console.log(bouquets);

               // console.log(Object.keys(bouquets));//pun in array

                let bouquetArray: Bouquet[] = [];
                let bouquetsObject = Object.keys(bouquets);//face un array cu proprietatile lui

                for (let i = 0; i < bouquetsObject.length; i++) {
                    bouquetArray.push(bouquets[bouquetsObject[i]]);// iau valoarea si o adaug in array
                    bouquetArray[i].key = bouquetsObject[i];

                }

                //console.log(bouquetArray);
                return bouquetArray.map(bouquet => {
                    return {
                        ...bouquet,
                        flowers: bouquet.flowers ? bouquet.flowers : []
                    };
                });
            }),
                tap(bouquets => {
                    this.bouquetService.setBouquets(bouquets);
                })
            );

    }


    delete(key: string) {

        return this.http.delete <Bouquet>('https://florarie-aa181-default-rtdb.europe-west1.firebasedatabase.app/bouquets.json')
            .pipe(map(bouquets => {
                //console.log(bouquets);

                console.log(Object.keys(bouquets));//pun in array

                let bouquetArray: Bouquet[] = [];
                let bouquetsObject = Object.keys(bouquets);//face un array cu proprietatile lui

                for (let i = 0; i < bouquetsObject.length; i++) {
                    bouquetArray.push(bouquets[bouquetsObject[i]]);// iau valoarea si o adaug in array
                    bouquetArray[i].key = bouquetsObject[i];


                }

                console.log(bouquetArray);
                return bouquetArray.map(bouquet => {
                    return {
                        ...bouquet,
                        flowers: bouquet.flowers ? bouquet.flowers : []
                    };
                });
            }),
                // tap(bouquets => {
                //     this.bouquetService.setBouquets(bouquets);
                // })
            );


    }
}

  

       

