import { Injectable, resolveForwardRef } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Bouquet } from "./bouquet.model";

@Injectable({providedIn:'root'})
export class BouquetsResolverService implements Resolve<Bouquet[]>{

    constructor(private dataStorageService:DataStorageService){}


        resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
             return  this.dataStorageService.fetchBouquets();
        }



}