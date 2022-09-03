import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Utilisateur } from 'src/app/models/utilisateur';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-basic-inputs',
  templateUrl: './basic-inputs.component.html',
  styleUrls: ['./basic-inputs.component.css']
})
export class BasicInputsComponent implements OnInit {

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
  numNumberTotalOfRegisterPeerMonth: number[] = [];
  MonthsOfRegister: Date[] = [];
  listOfMonth: any = [];

  numNumberTotalOfRegisterPeerYear: number[] = [];
  YearOfRegister: Date[] = [];
  listOfYear: any = [];

  Barchart: any = [];

  constructor(private crudApi: DashboardService,
              public tokenStorage: TokenStorageService,
              private userService: UtilisateurService,
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
      this.email = user.email;
      this.name = user.name;

      if (this.userService.getUserAvatar(this.userId) === null)
        this.img = false;
      else this.img = true;
     
    }
    this.getNumberTotalOfRegistersPeerMonth();
    this.getNumberTotalOfRegistersPeerYear();
  }

  getNumberTotalOfRegistersPeerMonth() {
    this.crudApi.getNumberOfRegisterPeerMonth()
    .subscribe((result: Utilisateur[]) => {
      this.listOfMonth = result;
      const n = 1;
      const m = 0;
      for (let i=0; i<this.listOfMonth.length; i++) {
        this.numNumberTotalOfRegisterPeerMonth.push(this.listOfMonth[i][n]);
        this.MonthsOfRegister.push(this.listOfMonth[i][m]);
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

  getNumberTotalOfRegistersPeerYear() {
    this.crudApi.getNumberOfRegisterPeerYear()
    .subscribe((result: Utilisateur[]) => {
      this.listOfYear = result;
      const n = 1;
      const m = 0;
      for (let i=0; i<this.listOfYear.length; i++) {
        this.numNumberTotalOfRegisterPeerYear.push(this.listOfYear[i][n]);
        this.YearOfRegister.push(this.listOfYear[i][m]);
      }
    //  this
      this.Barchart = new Chart('barChartRegisterPeerYear', {
        type: 'bar',
        data: {
          labels: this.YearOfRegister,

          datasets: [
            {
              data: this.numNumberTotalOfRegisterPeerYear,
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
