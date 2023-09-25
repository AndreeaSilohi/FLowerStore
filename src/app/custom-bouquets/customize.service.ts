import { EventEmitter } from "@angular/core";
import { Flowers } from "../shared/flowers.model";

export class CustomizeService{

    flowersChanged=new EventEmitter<Flowers[]>();
    // private flowers: Flowers[] = [

    //     new Flowers('Lalele', 5),
    //     new Flowers('Trandafiri', 7)
    //   ];

    public flowers:Flowers[]=[];

      getFlowers(){
        return this.flowers.slice();
      }

      addFlower(flower:Flowers){
        this.flowers.push(flower);
        this.flowersChanged.emit(this.flowers.slice());
      }

      addFlowers(flowers:Flowers[]){
         this.flowers.push(...flowers)
         this.flowersChanged.emit(this.flowers.slice());
      }
}