export class Flowers {
    public flower: string;
    public amount: number;
    public price: number;

    constructor(_flower: string, _amount: number, price?: number) {
        this.flower = _flower;
        this.amount = _amount;
        this.price = price;

    }
}