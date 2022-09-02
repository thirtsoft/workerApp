import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-invoice-reports',
  templateUrl: './invoice-reports.component.html',
  styleUrls: ['./invoice-reports.component.css']
})
export class InvoiceReportsComponent implements OnInit {
  
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
  id;
  userId;
  img: boolean;
  numberOfDemandePeerMonth: number[] = [];
  MonthsOfDemande: Date[] = [];
  listOfMonth: any = [];

  numberOfDemandePeerYear: number[] = [];
  YearOfDemande: Date[] = [];
  listOfYear: any = [];

  Barchart: any = [];

  constructor(private crudApi: DashboardService,
              public tokenStorage: TokenStorageService,
              private userService: UtilisateurService,
              public router: Router) {}

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
      this.email = user.email;
      this.name = user.name;

      if (this.userService.getUserAvatar(this.userId) === null)
        this.img = false;
      else this.img = true;
     
    }
    this.getNumbersOfAppointmentPeerMonth();
    this.getNumbersOfAppointmentPeerYear();
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

  getNumbersOfAppointmentPeerYear() {
    this.crudApi.getNumbersOfOuvriersPeerMonth()
    .subscribe((result: Appointment[]) => {
      this.listOfYear = result;
      const n = 1;
      const m = 0;
      for (let i=0; i<this.listOfYear.length; i++) {
        this.numberOfDemandePeerYear.push(this.listOfYear[i][n]);
        this.YearOfDemande.push(this.listOfYear[i][m]);
      }
    //  this
      this.Barchart = new Chart('barChartNumberAppointmentPeerYear', {
        type: 'bar',
        data: {
          labels: this.YearOfDemande,

          datasets: [
            {
              data: this.numberOfDemandePeerYear,
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

}
