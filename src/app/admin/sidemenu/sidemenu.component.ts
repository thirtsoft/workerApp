import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { CommonServiceService } from '../../common-service.service';
import { AuthService } from 'src/app/services/auth/security/auth.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { DashboardService } from 'src/app/services/dashboard.service';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  page = 'Dashboard';
  showDropdown = true;
  public bellCollapsed = true;
  public userCollapsed = true;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  name = '';
  username = '';

  showAdminBoard = false;
  showManagerBoard = false;
  showGestionnaireBoard = false;
  showUserBoard = false;
  numberOfNewRegister: any;
  numberOfAcceptedAppointment: any;
  numberOfPendingAppointment: any;
  id;
  userId;
  img: boolean;
  currentTime: number = 0;

  constructor(
    @Inject(DOCUMENT) private document,
    public router: Router,
    private commonService: CommonServiceService,
    public authService: AuthService,
    public tokenStorage: TokenStorageService,
    public userService: UtilisateurService,
    private crudApi: DashboardService
  ) {}
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if(this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.roles = this.tokenStorage.getUser().roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showGestionnaireBoard = this.roles.includes("ROLE_GESTIONNAIRE");
      this.showManagerBoard = this.roles.includes('ROLE_MANAGER');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      
      this.id = user.id
      this.username = user.username;
      this.name = user.name;

      if (this.userService.getUserAvatar(this.userId) === null)
        this.img = false;
      else this.img = true;

      this.loadMethods();
    }
  }

  loadMethods() {
    this.getNumberOfNewRegisters();
    this.getNumberOfPendingAppointment();
  }

  getNumberOfPendingAppointment(): void {
    this.crudApi.getNumberOfPendingAppointments().subscribe(data => {
      this.numberOfPendingAppointment = data;
    });
  }

  getNumberOfNewRegisters(): void {
    this.crudApi.getNumberOfPendingAppointments().subscribe(data => {
      this.numberOfPendingAppointment = data;
    });
  }

  getTS() {
    return this.currentTime;
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigateByUrl("admin/login-form").then(()=> {
      window.location.reload();
    });
  }

  getProfile() {
    this.router.navigate(['/admin/doc-profile']);
  }

  getHistoriqueLogin() {
    this.router.navigate(['/admin/admin-data-table']);
  }

  ngAfterViewInit() {
    this.loadDynmicallyScript('assets/admin/js/script.js');
  }
  loadDynmicallyScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() {}
  change(name) {
    this.page = name;
    this.commonService.nextmessage('admin');
  }

  main() {
    this.commonService.nextmessage('main');
  }
  clickLogout() {
    window.location.href = '/home';
  }
  bell() {
    this.bellCollapsed = !this.bellCollapsed;
    if (!this.userCollapsed) {
      this.userCollapsed = true;
    }
  }
  user() {
    this.userCollapsed = !this.userCollapsed;
    if (!this.bellCollapsed) {
      this.bellCollapsed = true;
    }
  }
}
