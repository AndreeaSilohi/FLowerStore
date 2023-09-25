import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CustomizeService } from "../custom-bouquets/customize.service";
import { Flowers } from "../shared/flowers.model";
import { Bouquet } from "./bouquet.model";


@Injectable()
export class BouquetService {

    bouquetsChanged = new Subject<Bouquet[]>();

    bouquetSelected = new EventEmitter<Bouquet>();

    public bouquets: Bouquet[] = [];

    constructor(private customizeService: CustomizeService) { }

    public static selectedBouquet: number = -1;



    setBouquets(bouquets: Bouquet[]) {
        this.bouquets = bouquets;
        this.bouquetsChanged.next(this.bouquets.slice());
    }
    getBouquets() {
        return this.bouquets.slice();
    }

    getBouquet(index: number) {
        return this.bouquets[index];

    }

    addFlowers(flowers: Flowers[]) {
        this.customizeService.addFlowers(flowers);
    }


    addBouquet(bouquet: Bouquet) {
        this.bouquets.push(bouquet);
        this.bouquetsChanged.next(this.bouquets.slice());
    }


    updateBouquet(index: number, newBouquet: Bouquet) {
        this.bouquets[index] = newBouquet;
        this.bouquetsChanged.next(this.bouquets.slice());


    }

    deleteBouquet(index: number) {
        this.bouquets.splice(index, 1);
        this.bouquetsChanged.next(this.bouquets.slice());



    }

    selectBouquet(bouquet: Bouquet) {

        BouquetService.selectedBouquet = this.bouquets.indexOf(bouquet);

    }

    getSelectedBouquet() {
        return this.bouquets[BouquetService.selectedBouquet];
    }
}