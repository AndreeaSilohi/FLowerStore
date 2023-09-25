import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Bouquet } from './bouquet.model';
import { BouquetService } from './bouquet.service';

@Component({
  selector: 'app-bouquets',
  templateUrl: './bouquets.component.html',
  styleUrls: ['./bouquets.component.css']

})
export class BouquetsComponent implements OnInit {
  selectedBouquet: Bouquet;



  selectedUser: User;
  isAuthenticated = false;
  private userSub: Subscription;
  config: any;

  // user = JSON.parse(localStorage.getItem('user'));


  constructor(private bouquetService: BouquetService,
    public routing: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private auth: AuthService) {

  }

  ngOnInit(): void {

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    })

    this.bouquetService.bouquetSelected
      .subscribe(
        (bouquet: Bouquet) => {
          this.selectedBouquet = bouquet;

        }
      )

    console.log(this.routing.url);
    
  }
  onNewBouquet() {
    this.routing.navigate(['new'], { relativeTo: this.route });
  }







}


