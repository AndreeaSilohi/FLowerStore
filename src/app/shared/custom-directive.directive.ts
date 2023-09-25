import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCustomDirective]'
})
export class CustomDirectiveDirective {

  constructor(private ElRef:ElementRef) {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    this.ElRef.nativeElement.style.color= "#" + randomColor;
   }

}
