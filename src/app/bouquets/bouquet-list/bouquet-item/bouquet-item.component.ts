import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { Bouquet } from '../../bouquet.model';
import { BouquetService } from '../../bouquet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bouquet-item',
  templateUrl: './bouquet-item.component.html',
  styleUrls: ['./bouquet-item.component.css']
})
export class BouquetItemComponent implements OnInit {

  cssRate = 2.6;
 
  @Input() bouquet: Bouquet;
  @Input() index: number;


  ngOnInit(): void {
   console.log(this.index);
  }

  constructor(private cartService: CartService,
    private bouquetService:BouquetService,
    private toastr: ToastrService) { }


  onAddToCart() {
    //this.cartService.addToCart(this.bouquet);
    this.toastr.success('This item was added!', 'Hello');
  }

  onDetails(item:any){
    this.bouquetService.selectBouquet(item);
  }

}
