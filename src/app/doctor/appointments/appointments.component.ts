import { Component, OnInit,TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppointmentService } from 'src/app/services/appointment.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { OuvrierService } from 'src/app/services/ouvrier.service';

import {CommonServiceService  } from './../../common-service.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
	list : any = []
  modalRef: BsModalRef;
  patientId;
  appointments : any = [];
  appointmentsList: any = [];
  patients :  any = [];
  appointmentId;

  info: any;
  private roles: string[];
  currentTime: number = 0;
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showVendeurBoard = false;

  username: string;
  userId;

  constructor(public commonService:CommonServiceService,
              private crudApi: AppointmentService,
              private tokenService: TokenStorageService,
              public ouvService: OuvrierService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
      
      this.getPatients();
      this.getAppointments();
		  this.list = this.commonService.getJSON();
		  this.list = this.list.filter(a=>a.status === 0);
      this.isLoggedIn = !!this.tokenService.getToken();
      if (this.isLoggedIn) {
        const user = this.tokenService.getUser();
        this.roles = user.roles;
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showUserBoard = this.roles.includes('ROLE_USER');
        this.username = user.username;
        this.userId = user.id;
      }
      this.getAppointmentByCustomerIdOrderIdDesc();
  }

  openModal(template: TemplateRef<any>,appointment) {
    this.appointmentId = appointment;
    this.modalRef = this.modalService.show(template,{class: 'modal-sm modal-dialog-centered'});
    
  }

  confirm(value) {
    delete this.appointmentId['patients']
    let data = {
      ...this.appointmentId
    }
    data['status'] = 'accept';
    this.commonService.updateAppointment(data,data.id)
      .subscribe(res=>{
        this.modalRef.hide();
        this.appointments = this.appointments.filter(a=>a.id != data.id);
        this.getPatients();
        this.getAppointments();
      });
   
  }

  btnColor() {
    document.getElementById('btn-yes').style.backgroundColor = "#09e5ab";
    document.getElementById('btn-yes').style.border = "1px solid #09e5ab";
    document.getElementById('btn-yes').style.color = "#fff";

    document.getElementById('btn-no').style.backgroundColor = "#fff";
    document.getElementById('btn-no').style.border = "1px solid #fff";
    document.getElementById('btn-no').style.color = "#000";
  }

  btnColorNo() {
    document.getElementById('btn-no').style.backgroundColor = "#09e5ab";
    document.getElementById('btn-no').style.border = "1px solid #09e5ab";
    document.getElementById('btn-no').style.color = "#fff";

    document.getElementById('btn-yes').style.backgroundColor = "#fff";
    document.getElementById('btn-yes').style.border = "1px solid #fff";
    document.getElementById('btn-yes').style.color = "#000";
  }

  decline() {
    delete this.appointmentId['patients']
    let data = {
      ...this.appointmentId
    }
    data['status'] = 'decline';
    this.commonService.updateAppointment(data,data.id)
      .subscribe(res=>{
        this.modalRef.hide();
        this.appointments = this.appointments.filter(a=>a.id != data.id);
        this.getPatients();
        this.getAppointments();
      })
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
        this.appointments = this.appointments.filter(a=>a.status === 'active');
      })
  }

  getPatients() {
    this.commonService.getpatients()
    .subscribe(res=>{
      this.patients = res;
    })
  }

  getAppointmentByCustomerIdOrderIdDesc() {
    this.crudApi.getAllAppointmentsByCustomerId(this.userId)
    .subscribe(res=>{
      this.appointmentsList = res;
    })
  }

 
}
