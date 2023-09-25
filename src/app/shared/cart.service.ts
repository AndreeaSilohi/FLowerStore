import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class CartService{

order:BehaviorSubject<any[]>;

constructor(){
    this.order=new BehaviorSubject<any[]>([]);

}

addToCart(bouquet:any){
    console.log(bouquet);
    this.order.value.push(
        {
            id:Date.now(),
            bouquet:bouquet,
           
          
        });

    this.order.next(this.order.value);

}

getOrders(){
    return this.order.asObservable();
}

}