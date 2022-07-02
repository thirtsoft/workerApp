import { Component, OnInit } from '@angular/core';
import { OuvrierService } from 'src/app/services/ouvrier.service';
import {CommonServiceService  } from './../../common-service.service';

@Component({
  selector: 'app-mypatients',
  templateUrl: './mypatients.component.html',
  styleUrls: ['./mypatients.component.css']
})
export class MypatientsComponent implements OnInit {
  
  appointments : any = [];
  patients :  any = [];
  ouvrierList: any = [];
  
  constructor(public commonService:CommonServiceService,
    public ouvService: OuvrierService) { }

  ngOnInit(): void {
    this.getPatients();
    this.getAppointments();
    this.getListOfOuvriers();

  }

  getAppointments() {
    this.commonService.getAppointments()
      .subscribe(res=>{
        this.appointments = res;
        let scope = this;
        this.appointments.forEach(index=>{
          let filter = scope.patients.filter(a=>a.key === index.patient_key);
          if(filter.length != 0) {
            index['patients'] = filter[0];
          }
        })
        this.appointments = this.appointments.filter(a=>a.status === 'accept');
      })
  }

  getPatients() {
    this.commonService.getpatients()
    .subscribe(res=>{
      this.patients = res;
    })
  }

  getListOfOuvriers() {
    this.ouvService.getOuvrierOrderByIdDesc()
    .subscribe(res=>{
      this.ouvrierList = res;
    })
  }

}
