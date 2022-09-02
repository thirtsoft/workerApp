import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Jeton } from 'src/app/models/jeton';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

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
  sumTotalOfJetonPeerMonth: number[] = [];
  MonthsOfJeton: Date[] = [];
  listOfMonth: any = [];

  sumTotalOfJetonPeerYear: number[] = [];
  YearOfJeton: Date[] = [];
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
    this.getSumTotalOfJetonsPeerMonth();
    this.getSumOfJetonPeerYear();
  }

  getSumTotalOfJetonsPeerMonth() {
    this.crudApi.getSumTotalOfJetonsPeerMonth()
    .subscribe((result: Jeton[]) => {
      this.listOfMonth = result;
      const n = 1;
      const m = 0;
      for (let i=0; i<this.listOfMonth.length; i++) {
        this.sumTotalOfJetonPeerMonth.push(this.listOfMonth[i][n]);
        this.MonthsOfJeton.push(this.listOfMonth[i][m]);
      }
 
      this.Barchart = new Chart('lineChartJetonPeerMonth', {
        type: 'line',
        data: {
          labels: this.MonthsOfJeton,

          datasets: [
            {
              data: this.sumTotalOfJetonPeerMonth,
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

  getSumOfJetonPeerYear() {
    this.crudApi.getSumTotalOfJetonsPeerYear()
    .subscribe((result: Jeton[]) => {
      this.listOfYear = result;
      const n = 1;
      const m = 0;
      for (let i=0; i<this.listOfYear.length; i++) {
        this.sumTotalOfJetonPeerYear.push(this.listOfYear[i][n]);
        this.YearOfJeton.push(this.listOfYear[i][m]);
      }
    //  this
      this.Barchart = new Chart('barChartJetonPeerYear', {
        type: 'bar',
        data: {
          labels: this.YearOfJeton,

          datasets: [
            {
              data: this.sumTotalOfJetonPeerYear,
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
