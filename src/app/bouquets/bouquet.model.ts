import { Flowers } from "../shared/flowers.model";
import { Review } from "../shared/review.model";

export class Bouquet {
    public name: string;
    public imagePath: string;
    public flowers: Flowers[];
    public description: string;
    public price: string;
    public key: string;
    public delMod: string;
    public total: number;
    public reviews:Review[];
    public bouquetId:string;
    public quantity:number;




    constructor(name: string, imagePath: string, flowers: Flowers[], desc: string, price: string,key?: string, delMod?: string,
         total?: number,reviews?:Review[],bouquetId?:string,quantity?:number) {
        this.name = name;
        this.imagePath = imagePath;
        this.flowers = flowers;
        this.description = desc;
        this.price = price;
        this.key = key;
        this.delMod = delMod;
        this.total = total;
        this.reviews=reviews;
        this.bouquetId=bouquetId;
        this.quantity=quantity;
        
    }

}