import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BouquetsComponent } from './bouquets/bouquets.component';
import { CustomBouquetsComponent } from './custom-bouquets/custom-bouquets.component';
import { BouquetItemComponent } from './bouquets/bouquet-list/bouquet-item/bouquet-item.component';
import { SharedComponent } from './shared/shared.component';
import { BouquetListComponent } from './bouquets/bouquet-list/bouquet-list.component';
import { BouquetDetailComponent } from './bouquets/bouquet-detail/bouquet-detail.component';
import { CustomizeComponent } from './custom-bouquets/customize/customize.component';
import { CustomBouquetsEditComponent } from './custom-bouquets/custom-bouquets-edit/custom-bouquets-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { CustomDirectiveDirective } from './shared/custom-directive.directive';
import { BouquetStartComponent } from './bouquets/bouquet-start/bouquet-start.component';
import { CustomizeService } from './custom-bouquets/customize.service';
import { BouquetsEditComponent } from './bouquets/bouquets-edit/bouquets-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BouquetService } from './bouquets/bouquet.service';
import { CartComponent } from './cart/cart.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { CartService } from './shared/cart.service';

import { CustomizeCartComponent } from './customize-cart/customize-cart.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.componnet';
import { AuthInterceptorService } from './auth/auth.interceptor.service';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { SaraComponent } from './sara/sara.component';
import { HomeComponent } from './home/home.component';


import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DragScrollModule } from 'ngx-drag-scroll';
import { CarouselAutoComponent } from './carousel-auto/carousel-auto.component';
import { ShortenPipe } from './shorten.pipe';
import { DescriptionComponent } from './bouquets/bouquet-detail/description/description.component';
import { AdditionalComponent } from './bouquets/bouquet-detail/additional/additional.component';
import { ReviewComponent } from './bouquets/bouquet-detail/review/review.component';
import { FooterShopComponent } from './footer-shop/footer-shop.component';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CarouselComponent } from './carousel/carousel.component';

export const firebaseConfig={
  apiKey:'',
  authDomain:'',
  databaseURL:'',
  storageBucket:'',
  messagingSenderId:''
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BouquetsComponent,
    CustomBouquetsComponent,
    BouquetItemComponent,
    SharedComponent,
    BouquetListComponent,
    BouquetDetailComponent,
    CustomizeComponent,
    CustomBouquetsEditComponent,
    DropdownDirective,
    CustomDirectiveDirective,
    BouquetStartComponent,
    BouquetsEditComponent,
    CartComponent,
  
 
    CustomizeCartComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    SaraComponent,
    HomeComponent,
    CarouselAutoComponent,
    ShortenPipe,
    DescriptionComponent,
    AdditionalComponent,
    ReviewComponent,
    FooterShopComponent,
    CarouselComponent,
  
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase,'proiect-personal'),
    AngularFirestoreModule,
    NgbModule,
    NgbCarouselModule,
    DragScrollModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
 

  
  
  ],
  providers: [CustomizeService, BouquetService,CartService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
    multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
