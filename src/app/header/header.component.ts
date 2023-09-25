import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  person:User;

  constructor(private dataStorageService: DataStorageService,
    public routing: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;

    });
  }
  onFetchItems() {
    this.dataStorageService.fetchBouquets().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();

  }

  onLogout(){

    this.authService.logout();

  }
  onNewBouquet() {
    this.routing.navigate(['new'], { relativeTo: this.route });
  }
}
