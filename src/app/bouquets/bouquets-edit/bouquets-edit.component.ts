import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Flowers } from 'src/app/shared/flowers.model';
import { Bouquet } from '../bouquet.model';
import { BouquetService } from '../bouquet.service';

@Component({
  selector: 'app-bouquets-edit',
  templateUrl: './bouquets-edit.component.html',
  styleUrls: ['./bouquets-edit.component.css']
})
export class BouquetsEditComponent implements OnInit {
  id: number;
  editMode = false;
  bouquetForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private bouquetService: BouquetService,
    private router: Router,
    private dataStorageService:DataStorageService) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();

        }
      );
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
    let bouquetName = '';
    let bouquetImagePath = '';
    let bouquetDescription = '';
    let bouquetFlowers = new FormArray([]);
    let bouquetPrice='';

    // if (this.editMode) {
    //   const bouquet = this.bouquetService.getBouquet(this.id);
    //   bouquetName = bouquet.name;
    //   bouquetImagePath = bouquet.imagePath;
    //   bouquetDescription = bouquet.description;
    //   bouquetPrice=bouquetPrice=bouquet.price;
    //   if (bouquet['flowers']) {
    //     for (let flower of bouquet.flowers) {
    //       bouquetFlowers.push(
    //         new FormGroup({
    //           'name': new FormControl(flower.flower),
    //           'amount': new FormControl(flower.amount, [
    //             Validators.required,
    //             Validators.pattern(/^[1-9]+[0-9]*$/)
    //           ])
    //         })
    //       );
    //     }
    //   }
    // }

    this.bouquetForm = new FormGroup({
      'name': new FormControl(bouquetName, Validators.required),
      'imagePath': new FormControl(bouquetImagePath, Validators.required),
      'description': new FormControl(bouquetDescription, Validators.required),
      'flowers': bouquetFlowers,
      'price': new FormControl(bouquetPrice, Validators.required),
    });


  }

  get controls() {
    return (<FormArray>this.bouquetForm.get('flowers')).controls;
  }

  onAddFlower() {
    (<FormArray>this.bouquetForm.get('flowers')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );


  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSaveData(){

  let bouquet:Bouquet=new Bouquet('','',[],'','');
  bouquet.name=this.bouquetForm.get('name').value;
  bouquet.description=this.bouquetForm.get('description').value;
  bouquet.imagePath=this.bouquetForm.get('imagePath').value;
  bouquet.flowers=[];
  bouquet.price=this.bouquetForm.get('price').value;

  for(let i=0;i<(this.bouquetForm.get('flowers') as FormArray).controls.length;i++){
    let flower:Flowers=new Flowers('',0);
    flower.amount=(this.bouquetForm.get('flowers') as FormArray).controls[i].get('amount').value;
    flower.flower=(this.bouquetForm.get('flowers') as FormArray).controls[i].get('name').value;
    bouquet.flowers.push(flower);

    
  }


  
  this.dataStorageService.storeBouquets(bouquet);
  }

  // onDeleteFlower(index:number){
  //  (<FormArray> this.bouquetForm.get('flowers')).removeAt(index);

  // }


}
