import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bouquet } from '../bouquets/bouquet.model';
import { BouquetService } from '../bouquets/bouquet.service';
import { CartService } from '../shared/cart.service';
import { Flowers } from '../shared/flowers.model';
import { CustomizeService } from './customize.service';

@Component({
  selector: 'app-custom-bouquets',
  templateUrl: './custom-bouquets.component.html',
  styleUrls: ['./custom-bouquets.component.css'],

})
export class CustomBouquetsComponent implements OnInit {
  flowers: Flowers[] ;
  bouquet: Bouquet;

  constructor(private customService:CustomizeService,
    private bouquetService: BouquetService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    this.flowers=this.customService.getFlowers();
    this.customService.flowersChanged
    .subscribe(
      (flowers:Flowers[])=>{
        this.flowers=flowers;
      }
    )
  }




  // onNewBouquet(){
  //   this.router.navigate(['newC'],{relativeTo:this.route});
  //   // console.log('dadsda');
  // }

  onAddToCart() {
    this.cartService.addToCart(this.bouquet);
  }

}

