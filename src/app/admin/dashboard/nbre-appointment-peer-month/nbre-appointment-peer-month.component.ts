import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { Appointment } from 'src/app/models/appointment';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-nbre-appointment-peer-month',
  templateUrl: './nbre-appointment-peer-month.component.html',
  styleUrls: ['./nbre-appointment-peer-month.component.css']
})
export class NbreAppointmentPeerMonthComponent implements OnInit {

  numberOfDemandePeerMonth: number[] = [];
  MonthsOfDemande: Date[] = [];
  listOfMonth: any = [];

  Barchart: any = [];

  constructor(public crudApi: DashboardService) { }

  ngOnInit(): void {
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
        type: 'bar',
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

}
