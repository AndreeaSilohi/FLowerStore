import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  orders: any[];
  sum = 0;
  coupon: string;
  total:string;

  constructor(public cartService: CartService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.getOrders().subscribe((response) => {

      this.orders = [...response];
      //console.log(this.orders);

      this.getTotal();

    }
    )


  }

  getSubtotal(price, quantity) {

    return parseFloat(price.substring(0, price.length - 1)) * quantity;
     
  }

  onSubmit() {
    this.toastr.success('Your order has been placed', 'Hello');

    this.router.navigate(['/home']);



  }
  onApplyCoupon() {

    this.toastr.success('Coupon has been applied', 'Hello');
    this.coupon='';
  }

  getTotal(){
//console.log(this.orders);
    let t=0;
    for(let order of this.orders){
      t+=this.getSubtotal(order.bouquet.price,order.bouquet.quantity);
    }
    this.total=t+'$';
  }
}