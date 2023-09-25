export class Review{

    public userName:string;
    public comment:string;
    public review:any;
    public email:string;

    public key:string;
    public bouquetId:string;

 

    constructor(userName:string,comment:string,review:any,email:string,bouquetId?:string,key?:string) {
        this.userName=userName;
        this.comment=comment;
        this.review=review;
        this.email=email;
        this.bouquetId=bouquetId;
        this.key=key;
        
       
    }

}