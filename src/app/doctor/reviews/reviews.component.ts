import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  ratingsList: any = [];

  info: any;
  private roles: string[];
  currentTime: number = 0;
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showVendeurBoard = false;

  username: string;
  userId;
  maxRatingValue = 5;

  constructor(private rat:RatingService,
    private tokenService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.username = user.username;
      this.userId = user.id;
    }
    this.getRatingsList();
  }

  getRatingsList() {
  	this.rat.getRatingsByCustomerIdOrderByIdDesc(this.userId)
  		.subscribe(res=>{
  			this.ratingsList = res;
        console.log(this.ratingsList);
  		})
  }

}
