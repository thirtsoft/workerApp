import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { Chart } from 'chart.js';

import { AuthService } from 'src/app/services/auth/security/auth.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { HistoriqueLoginService } from 'src/app/services/historique-login.service';
import { RatingService } from 'src/app/services/rating.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import * as $ from 'jquery';
//import 'datatables.net';
import { Ouvrier } from 'src/app/models/ouvrier';
import { OuvrierService } from 'src/app/services/ouvrier.service';
import { Utilisateur } from 'src/app/models/utilisateur';

//declare var $: any;
//declare var Morris: any;
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
  listTop30Appointments: any = [];

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  name = '';
  username = '';
  email;

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
  pRating: number=1;
  searchRatingText: any;
  pMember: number=1;
  searchMemberText: any;
  maxRatingValue = 5;
  userId;
  img: boolean;
  numberOfDemandePeerMonth: number[] = [];
  MonthsOfDemande: Date[] = [];
  listOfMonth: any = [];

  numNumberTotalOfRegisterPeerMonth: number[] = [];
  MonthsOfRegister: Date[] = [];
  listOfMonthRegister: any = [];

  Barchart: any = [];

  constructor(private crudApi: DashboardService,
              public authService: AuthService,
              public tokenStorage: TokenStorageService,
              private userService: UtilisateurService,
              public ouvService: OuvrierService,
              public router: Router) {}

  ngOnInit(): void {
    /*
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
    */

    /* Morris Area Chart */
    /*
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
    */

    /* Morris Line Chart */
    /*
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
    */

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
      this.email = user.email;
      this.name = user.name;

      if (this.userService.getUserAvatar(this.userId) === null)
        this.img = false;
      else this.img = true;
     
    }
    this.getListRatings();
    this.getListHistoriqueLogins();
    this.getNumberOfOuvriers();
    this.getNumberOfRecruteurs();
    this.getNumberOfRating();
    this.getNumberTotalOfAppointmentInYear();
    this.getSumTotalOfJetonInYear();
    this.getTop30AppointmentOrderByIdDesc(); 
    this.getNumbersOfAppointmentPeerMonth();
    this.getNumberTotalOfRegistersPeerMonth();
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
    this.crudApi.getTop30RatingOrderByIdDesc()
      .subscribe(res => {
        this.listRatings = res;
         $(function () {
          $("table").DataTable();
        });
      },
      error => this.errorMessage = <any>error);
  }
  
  getListHistoriqueLogins() {
    this.crudApi.getTop30HistoriqueLoginsOrderByIdDesc().subscribe(
      response => {
        this.listHistoriqueLogin = response;
        $(function () {
          $("table").DataTable();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  getTop30AppointmentOrderByIdDesc() {
    this.crudApi.getTop30AppointmentsOderByIdDesc().subscribe(
      response => {
        this.listTop30Appointments = response;
        $(function () {
          $("table").DataTable();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getNumbersOfAppointmentPeerMonth() {
    this.crudApi.getNumbersOfAppointmentsPeerMonth()
    .subscribe((result: Appointment[]) => {
      this.listOfMonth = result;
      const n = 1;
      const m = 0;
      for (let i=0; i<this.listOfMonth.length; i++) {
        this.numberOfDemandePeerMonth.push(this.listOfMonth[i][n]);
        this.MonthsOfDemande.push(this.listOfMonth[i][m]);
      }
    //  this
      this.Barchart = new Chart('barChartNumberDemandePeerMonth', {
        type: 'line',
        data: {
          labels: this.MonthsOfDemande,

          datasets: [
            {
              data: this.numberOfDemandePeerMonth,
              borderColor: '#3cb371',
              backgroundColor: "#5F9EA0",

            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
          }
        }
      });
    });
  }

  getNumberTotalOfRegistersPeerMonth() {
    this.crudApi.getNumberOfRegisterPeerMonth()
    .subscribe((result: Utilisateur[]) => {
      this.listOfMonthRegister = result;
      const n = 1;
      const m = 0;
      for (let i=0; i<this.listOfMonthRegister.length; i++) {
        this.numNumberTotalOfRegisterPeerMonth.push(this.listOfMonthRegister[i][n]);
        this.MonthsOfRegister.push(this.listOfMonthRegister[i][m]);
      }
 
      this.Barchart = new Chart('lineChartRegisterPeerMonth', {
        type: 'line',
        data: {
          labels: this.MonthsOfRegister,

          datasets: [
            {
              data: this.numNumberTotalOfRegisterPeerMonth,
              borderColor: '#3cb371',
              backgroundColor: "#FF7F50",
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          responsive: true,
          scales: {
             xAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
          }
        }
      });
    });
  
  }

}
