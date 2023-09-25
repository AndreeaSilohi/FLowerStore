import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/shared/cart.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Bouquet } from '../bouquet.model';
import { BouquetService } from '../bouquet.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bouquet-detail',
  templateUrl: './bouquet-detail.component.html',
  styleUrls: ['./bouquet-detail.component.css']
})
export class BouquetDetailComponent implements OnInit {
  

  bouquet:Bouquet=new Bouquet('','',[],'','');
  id: number;
  isAuthenticated = false;
  private userSub: Subscription;
  input:number;

  constructor(private bouquetService: BouquetService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private dataStorageService: DataStorageService,
    public routing: Router,
    public authService: AuthService,
    private toastr: ToastrService) 
    {
    this.bouquet = this.bouquetService.getSelectedBouquet();
  }

  ngOnInit(): void {

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    })

    this.route.params
      .subscribe(
        (params: Params) => {

          this.id = +params['id'];
          this.bouquet = this.bouquetService.getBouquet(this.id);
          //console.log(this.bouquet);

        }
      );
  }

  onAddForCustomize() {
    this.bouquetService.addFlowers(this.bouquet.flowers);
  }

  onEditBouquet() {
    //this.router.navigate(['edit'],{relativeTo:this.route});

    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });


  }
  onDeleteBouquet() {
    this.bouquetService.deleteBouquet(this.id);
    // this.dataStorageService.delete(this.bouquet.key).subscribe(()=>{

    // }


    // );
    this.router.navigate(['/bouquets']);




  }

  onAddToCart() {
    this.cartService.addToCart(this.bouquet);
    
    this.bouquet.quantity = this.input;
    
    this.toastr.success('This item was added!', 'Hello');
   
  }

  onDescription(){
    this.router.navigate(['description'],{relativeTo:this.route});
  }


  onAdditional(){
    this.router.navigate(['additional'],{relativeTo:this.route});
  }

  onReview(){
    this.router.navigate(['review',this.bouquet.bouquetId],{relativeTo:this.route});

  }

 


// then you apply this function to a button element in the HTML doc
// <button onclick="getValue()">Get value</button>
}
