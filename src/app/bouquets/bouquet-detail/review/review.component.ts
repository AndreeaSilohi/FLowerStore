import { ChangeDetectorRef, Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Review } from 'src/app/shared/review.model';
import { ReviewS } from 'src/app/shared/reviewS.service';
import { Bouquet } from '../../bouquet.model';
import { BouquetService } from '../../bouquet.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit,OnDestroy {

  cssRate = 2.6;
  reviewsForm: FormGroup;
  allReviews:Review[]=[];
  dataSubscription;
  id:number;
  reviews:Review[]=[];

  bouquet:Bouquet=new Bouquet('','',[],'','');
  
  @Input() bouquetName:string;

  constructor(private reviewS:ReviewS,
    private dataStorage:DataStorageService,
    private ctr:ChangeDetectorRef,
    private route:ActivatedRoute,
    private bouquetService:BouquetService) { }
 
  ngOnInit(): void {
    this.reviewsForm = new FormGroup({
      'rating': new FormControl(),
      'comment': new FormControl(),
      'name': new FormControl(),
      'email': new FormControl(),
      'bouquetId':new FormControl(),

    });


    this.route.params
    .subscribe(
      (params: Params) => {

        //this.id = +params['id'];
        this.reviewsForm.get('bouquetId').setValue(params['id']);

        console.log(params);
        
      

      }
    );

    this.dataSubscription = this.dataStorage.fetchReviews().subscribe(

      response => {

        this.allReviews = this.reviewS.getReviews();
        this.filterReviewsById();
    

        this.ctr.detectChanges();

      }

    );


    
    
  }





  onSubmit() {
   const newReview=new Review(this.reviewsForm.value['name'],this.reviewsForm.value['comment'],
   this.reviewsForm.value['rating'],this.reviewsForm.value['email'],this.reviewsForm.value['bouquetId']);
   this.allReviews.push(newReview);


   this.reviewS.addReview(newReview);
   this.dataStorage.storeReviews();

      //console.log(newReview);
  
  }

  ngOnDestroy(): void {
   
    this.dataSubscription.unsubscribe();
  }


  filterReviewsById(){
    this.reviews=this.allReviews.filter(item=>{
    return item.bouquetId==this.reviewsForm.get('bouquetId').value  });

  }

}
