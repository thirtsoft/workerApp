import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { JetonService } from 'src/app/services/jeton.service';

import { CommonServiceService } from './../../common-service.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoices : any = [];
  jetonList: any = [];

  info: any;
  private roles: string[];

  currentTime: number = 0;

  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showVendeurBoard = false;

  username: string;
  email: String;
  userId;
  photo;
  img: boolean;

  currentUser;


  constructor(public commonService:CommonServiceService,
              private jet:JetonService,
              private tokenService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
  	this.getTransactions();
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.username = user.username;
      this.userId = user.id;
      console.log(this.userId);
    }
    this.getJetonsList();
  }

  getTransactions() {
  	this.commonService.getTransactions()
  		.subscribe(res=>{
  			this.invoices = res;
  		})
  }

  getJetonsList() {
    console.log(this.userId);
  	this.jet.getJetonsByCustomerIdByIdDesc(this.userId)
  		.subscribe(res=>{
  			this.jetonList = res;
  		})
  }

}
