import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  info: any;
  roles: string[];

  currentTime: number = 0;
  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;

  username: any;
  userId: any;

  constructor(private tokenService: TokenStorageService) {}

  ngOnInit(): void { 
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.username = user.username;
      this.userId = user.id;
    }
  }

  getTS() {
    return this.currentTime;
  }


}
