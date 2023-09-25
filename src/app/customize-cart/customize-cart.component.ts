import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Bouquet } from '../bouquets/bouquet.model';
import { BouquetService } from '../bouquets/bouquet.service';
import { CustomizeService } from '../custom-bouquets/customize.service';
import { CartService } from '../shared/cart.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Flowers } from '../shared/flowers.model';

@Component({
  selector: 'app-customize-cart',
  templateUrl: './customize-cart.component.html',
  styleUrls: ['./customize-cart.component.css']
})
export class CustomizeCartComponent implements OnInit {


  flowerTypes = {
    tulips: { price: 10, amount: 0 },
    lily: { price: 12, amount: 0 },
    roses: { price: 2, amount: 0 },
    orchid: { price: 32, amount: 0 },
    fresia: { price: 11, amount: 0 },

  }

  id: number;
  editMode = false;
  bouquetForm: FormGroup;
  bouquet: Bouquet;

  roses = true;
  sum = 0;

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private route: ActivatedRoute,
    private bouquetService: BouquetService,
    private router: Router,
    private dataStorageService: DataStorageService,
    private cartService: CartService,
    public authService: AuthService,
    public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();

        }
      );

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    })


  }

  onSubmit() {
    if (this.editMode) {
      this.bouquetService.updateBouquet(this.id, this.bouquetForm.value);
    } else {
      this.bouquetService.addBouquet(this.bouquetForm.value);
    }
    this.onCancel();


  }

  private initForm() {


    let notes = '';
    let delivery = '';
    let flowers = '';



    if (this.editMode) {
      const bouquet = this.bouquetService.getBouquet(this.id);
      notes = bouquet.description;
      delivery = bouquet.delMod;


    }

    this.bouquetForm = new FormGroup({
      'roses-checkbox': new FormControl(false, Validators.required),
      'roses-number': new FormControl({ value: 0, disabled: true }, Validators.required),

      'orchid-checkbox': new FormControl(false, Validators.required),
      'orchid-number': new FormControl({ value: 0, disabled: true }, Validators.required),


      'tulips-checkbox': new FormControl(false, Validators.required),
      'tulips-number': new FormControl({ value: 0, disabled: true }, Validators.required),


      'fresia-checkbox': new FormControl(false, Validators.required),
      'fresia-number': new FormControl({ value: 0, disabled: true }, Validators.required),


      'lily-checkbox': new FormControl(false, Validators.required),
      'lily-number': new FormControl({ value: 0, disabled: true }, Validators.required),

      'notes': new FormControl(''),
      'delivery': new FormControl(null, Validators.required),

      //'price': new FormControl(0,Validators.min(14))



    });


  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }




  onAddToCart() {
    //console.log(this.bouquetForm.valid);
    var flowers: Flowers[] = [];
    if (this.bouquetForm.get('roses-checkbox').value) {
      flowers.push(new Flowers('roses', this.bouquetForm.get('roses-number').value))
    }

    console.log(flowers);
    this.bouquet = new Bouquet(this.bouquetForm.get('notes').value, '', flowers, '', this.sum.toString()+'$','','',this.sum,[],'',1);
    

    //console.log(this.bouquetForm);

    this.cartService.addToCart(this.bouquet);
  }




  change(flower) {
    switch (flower) {
      case 1: {
        this.bouquetForm.controls['roses-number'].enable();
        break;
      }
      case 2: {
        this.bouquetForm.controls['tulips-number'].enable();
        break;
      }

      case 3: {
        this.bouquetForm.controls['orchid-number'].enable();
        break;
      }


      case 4: {
        this.bouquetForm.controls['lily-number'].enable();
        break;
      }

      case 5: {
        this.bouquetForm.controls['fresia-number'].enable();
        break;
      }


      default: {
        //statements; 
        break;
      }

    }
  }

  radioClick(metod) {
    this.bouquetForm.get('delivery').setValue(metod);
  }



  calculateTotal(event, type) {

    this.sum = this.sum +(event-this.flowerTypes[type].amount)*this.flowerTypes[type].price;
    this.flowerTypes[type].amount=event;


//noua valoare a inputului dupa event(click)
//$ 


  }

}

