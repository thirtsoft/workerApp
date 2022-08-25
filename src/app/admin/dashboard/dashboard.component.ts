import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { HistoriqueLogin } from 'src/app/models/historique-login';
import { Rating } from 'src/app/models/rating';
import { Utilisateur } from 'src/app/models/utilisateur';
import { Login } from 'src/app/services/auth/models/login';
import { AuthService } from 'src/app/services/auth/security/auth.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { HistoriqueLoginService } from 'src/app/services/historique-login.service';
import { RatingService } from 'src/app/services/rating.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
declare var $: any;
declare var Morris: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  listRatings: any = [];
  listOuvriers: any = [];
  listUtilisateurs: any = [];
  listHistoriqueLogin: any = [];

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginInfo: Login;

  showAdminBoard = false;
  showManagerBoard = false;
  showGestionnaireBoard = false;
  showUserBoard = false;
  numberOfRegister: any;
  numberOfOuvrier: any;
  numberOfRating: any;
  numberOfAcceptedAppointmentInYear: any;
  sumTotalOfJetonInYear: any;
  id;
  p: number=1;
  searchText: any;
  maxRatingValue = 5;

  constructor(private crudApi: DashboardService,
              public authService: AuthService,
              public tokenStorage: TokenStorageService,
              private userService: UtilisateurService,
              private ratService: RatingService,
              private histService: HistoriqueLoginService,
              public router: Router) {}

  ngOnInit(): void {
    let chartAreaData = [
      { y: '2006', a: 100, b: 90 },
      { y: '2007', a: 75, b: 65 },
      { y: '2008', a: 50, b: 40 },
      { y: '2009', a: 75, b: 65 },
      { y: '2010', a: 50, b: 40 },
      { y: '2011', a: 75, b: 65 },
      { y: '2012', a: 100, b: 90 },
    ];
    let chartLineData = [
      { y: '2006', a: 100, b: 90 },
      { y: '2007', a: 75, b: 65 },
      { y: '2008', a: 50, b: 40 },
      { y: '2009', a: 75, b: 65 },
      { y: '2010', a: 50, b: 40 },
      { y: '2011', a: 75, b: 65 },
      { y: '2012', a: 100, b: 90 },
    ];

    /* Morris Area Chart */
    Morris.Area({
      element: 'morrisArea',
      data: [
        { y: '2013', a: 60 },
        { y: '2014', a: 100 },
        { y: '2015', a: 240 },
        { y: '2016', a: 120 },
        { y: '2017', a: 80 },
        { y: '2018', a: 100 },
        { y: '2019', a: 300 },
      ],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Revenue'],
      lineColors: ['#1b5a90'],
      lineWidth: 2,

      fillOpacity: 0.5,
      gridTextSize: 10,
      hideHover: 'auto',
      resize: true,
      redraw: true,
    });

    /* Morris Line Chart */
    Morris.Line({
      element: 'morrisLine',
      data: [
        { y: '2015', a: 100, b: 30 },
        { y: '2016', a: 20, b: 60 },
        { y: '2017', a: 90, b: 120 },
        { y: '2018', a: 50, b: 80 },
        { y: '2019', a: 120, b: 150 },
      ],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Doctors', 'Patients'],
      lineColors: ['#1b5a90', '#ff9d00'],
      lineWidth: 1,
      gridTextSize: 10,
      hideHover: 'auto',
      resize: true,
      redraw: true,
    });

    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showGestionnaireBoard = this.roles.includes("ROLE_GESTIONNAIRE");
      this.showManagerBoard = this.roles.includes('ROLE_MANAGER');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }

    this.getListNewsRegisters();
    this.getListRatings();
    this.getListHistoriqueLogins();
    this.getNumberOfOuvriers();
    this.getNumberOfRecruteurs();
    this.getNumberOfRating();
    this.getNumberTotalOfAppointmentInYear();
    this.getSumTotalOfJetonInYear();
  }

  getNumberOfOuvriers(): void {
    this.crudApi.countNumberOfOuvriers().subscribe(data => {
      this.numberOfOuvrier = data;
    });
  }

  getNumberOfRecruteurs(): void {
    this.crudApi.countNumberOfRecruteurs().subscribe(data => {
      this.numberOfRegister = data;
      console.log(this.numberOfRegister);
    });
  }

  getNumberOfRating(): void {
    this.crudApi.countNumberOfRating().subscribe(data => {
      this.numberOfRating = data;
    });
  }

  getNumberTotalOfAppointmentInYear(): void {
    this.crudApi.getNumberTotalOfAppointmentsInYear().subscribe(data => {
      this.numberOfAcceptedAppointmentInYear = data;
    });
  }

  getSumTotalOfJetonInYear(): void {
    this.crudApi.getSumTotalOfJetonsInYear().subscribe(data => {
      this.sumTotalOfJetonInYear = data;
    });
  }

  getListRatings() {
    this.ratService.getAllRatingOrderByIdDesc().subscribe(
      (response: Rating[]) => {
        this.listRatings = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  getListNewsRegisters() {
    this.userService.getAllNewsUtilisateursOrderByIdDesc().subscribe(
      (response: Utilisateur[]) => {
        this.listUtilisateurs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }
  
  getListHistoriqueLogins() {
    this.histService.getHistoriqueLoginsOrderByIdDesc().subscribe(
      (response: HistoriqueLogin[]) => {
        this.listHistoriqueLogin = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

}
