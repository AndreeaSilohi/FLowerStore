import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdditionalComponent } from './bouquets/bouquet-detail/additional/additional.component';
import { BouquetDetailComponent } from './bouquets/bouquet-detail/bouquet-detail.component';
import { DescriptionComponent } from './bouquets/bouquet-detail/description/description.component';
import { ReviewComponent } from './bouquets/bouquet-detail/review/review.component';
import { BouquetsEditComponent } from './bouquets/bouquets-edit/bouquets-edit.component';
import { BouquetsResolverService } from './bouquets/bouquets-resolver.service';
import { BouquetsComponent } from './bouquets/bouquets.component';
import { CartComponent } from './cart/cart.component';

import { CustomBouquetsComponent } from './custom-bouquets/custom-bouquets.component';
import { CustomizeCartComponent } from './customize-cart/customize-cart.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'bouquets', component: BouquetsComponent, children: [

      { path: ':id/edit', component: BouquetsEditComponent }
    ]
  },
  {
    path: 'customize', component: CustomizeCartComponent, children: [

    ]
  },

  {
    path: 'bouquets/:id', component: BouquetDetailComponent,
    resolve: [BouquetsResolverService], children: [
      { path: 'additional', component: AdditionalComponent },
      { path: 'review/:id', component: ReviewComponent},
      { path: 'description', component: DescriptionComponent }
    ]
  },





  { path: 'cart', component: CartComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new', component: BouquetsEditComponent },

  //  {path:'bouquet-detail',component:BouquetDetailComponent}
  //  {path:'detail',component:BouquetDetailComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})
export class AppRoutingModule {


}
