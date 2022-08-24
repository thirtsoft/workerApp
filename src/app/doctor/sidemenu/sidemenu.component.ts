import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/security/auth.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';

import { CommonServiceService } from './../../common-service.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  name;
  splitVal;
  base;
  page;

  info: any;
  private roles: string[];

  currentTime: number = 0;

  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;

  username: string;
  email: String;
  userId;
  photo;
  img: boolean;

  constructor(private toastr: ToastrService,
            private tokenService: TokenStorageService,
            public autService: AuthService,
            private modalService: BsModalService,
    private router: Router,
    public commonService: CommonServiceService
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event instanceof NavigationStart) {
          this.splitVal = event.url.split('/');
          this.base = this.splitVal[1];
          this.page = this.splitVal[2];
        }
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showModeratorBoard = this.roles.includes("ROLE_MODERATOR");
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.username = user.username;
      this.userId = user.id;
      this.photo = user.photo;
    }
  }

  getUserOrder() {
    this.router.navigate(['/my-account/' + this.userId]);
  }

  getProfile() {
    this.router.navigate(['/home/profile/' + this.userId]);
  }

  getTS() {
    return this.currentTime;
  }

  logout() {
    this.toastr.warning('Au revoir','Vous etes bien déconnecter', {
      timeOut: 2500,
      positionClass: 'toast-top-right',
    });
    this.tokenService.signOut();
    this.router.navigateByUrl("home").then(() => {
      window.location.reload();
    });
  }
/*
  logout() {
    localStorage.clear();
    this.commonService.nextmessage('logout');
    this.router.navigate(['/']);
  }
  */

  navigate(name) {
    this.name = name;
    this.commonService.nextmessage(name);
  }
}
