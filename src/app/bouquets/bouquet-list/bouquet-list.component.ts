
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Bouquet } from '../bouquet.model';
import { BouquetService } from '../bouquet.service';

@Component({
  selector: 'app-bouquet-list',
  templateUrl: './bouquet-list.component.html',
  styleUrls: ['./bouquet-list.component.css']
})
export class BouquetListComponent implements OnInit,OnDestroy{
 
  bouquets:Bouquet[];
  subscription:Subscription;

  @Input()bouquet:Bouquet;

 

  constructor(private bouquetService: BouquetService,
    private router:Router,
    private route:ActivatedRoute) { }
  

  ngOnInit(): void {
   
    this.subscription=this.bouquetService.bouquetsChanged
    .subscribe(
      (bouquets:Bouquet[])=>{
        this.bouquets=bouquets;

      }
     
    );
    this.bouquets=this.bouquetService.getBouquets();
   // console.log(this.bouquets);
  }
onNewBouquet(){
this.router.navigate(['new'],{relativeTo:this.route});
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
}
