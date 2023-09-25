import { Component, ElementRef,  OnInit, ViewChild } from '@angular/core';
import { Flowers } from 'src/app/shared/flowers.model';
import { CustomizeService } from '../customize.service';

@Component({
  selector: 'app-custom-bouquets-edit',
  templateUrl: './custom-bouquets-edit.component.html',
  styleUrls: ['./custom-bouquets-edit.component.css']
})
export class CustomBouquetsEditComponent implements OnInit {


  @ViewChild ('nameInput')nameInputRef:ElementRef;
  @ViewChild ('amountInput') amountInputRef:ElementRef;
 
  constructor(private customizeService:CustomizeService) { }

  ngOnInit(): void {
  }


  onAddFlower(){
    const flwName=this.nameInputRef.nativeElement.value;
    const flwAmount=this.amountInputRef.nativeElement.value;
    const newFlower=new Flowers(flwName,flwAmount);
    this.customizeService.addFlower(newFlower);
  }
}
