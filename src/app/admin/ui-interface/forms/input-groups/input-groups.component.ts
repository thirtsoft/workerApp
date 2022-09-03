import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Ouvrier } from 'src/app/models/ouvrier';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-input-groups',
  templateUrl: './input-groups.component.html',
  styleUrls: ['./input-groups.component.css']
})
export class InputGroupsComponent implements OnInit {
  
  name = '';
  username = '';
  id;
  userId;
  img: boolean;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  
  showAdminBoard = false;
  showManagerBoard = false;
  showGestionnaireBoard = false;
  showUserBoard = false;
  
  numNumberTotalOfOuvrierPeerMonth: number[] = [];
  MonthsOfOuvrier: Date[] = [];
  listOfMonth: any = [];

  numNumberTotalOfOuvrierPeerYear: number[] = [];
  YearOfOuvrier: Date[] = [];
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
      this.name = user.name;

      if (this.userService.getUserAvatar(this.userId) === null)
        this.img = false;
      else this.img = true;
     
    }
    this.getNumberTotalOfOuvriersPeerMonth();
    this.getNumberTotalOfOuvriersPeerYear();
  }

  getNumberTotalOfOuvriersPeerMonth() {
    this.crudApi.getNumbersOfOuvriersPeerMonth()
    .subscribe((result: Ouvrier[]) => {
      this.listOfMonth = result;
      const n = 1;
      const m = 0;
      for (let i=0; i<this.listOfMonth.length; i++) {
        this.numNumberTotalOfOuvrierPeerMonth.push(this.listOfMonth[i][n]);
        this.MonthsOfOuvrier.push(this.listOfMonth[i][m]);
      }
 
      this.Barchart = new Chart('lineChartOuvrierPeerMonth', {
        type: 'line',
        data: {
          labels: this.MonthsOfOuvrier,

          datasets: [
            {
              data: this.numNumberTotalOfOuvrierPeerMonth,
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

  getNumberTotalOfOuvriersPeerYear() {
    this.crudApi.countNumbersOfOuvriersPeerYear()
    .subscribe((result: Ouvrier[]) => {
      this.listOfYear = result;
      const n = 1;
      const m = 0;
      for (let i=0; i<this.listOfYear.length; i++) {
        this.numNumberTotalOfOuvrierPeerYear.push(this.listOfYear[i][n]);
        this.YearOfOuvrier.push(this.listOfYear[i][m]);
      }
    //  this
      this.Barchart = new Chart('barChartOuvrierPeerYear', {
        type: 'bar',
        data: {
          labels: this.YearOfOuvrier,

          datasets: [
            {
              data: this.numNumberTotalOfOuvrierPeerYear,
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
