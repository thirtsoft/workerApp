import { Component, OnInit,TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import {CommonServiceService  } from './../../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/security/auth.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  list : any = []
  modalRef: BsModalRef;
  appointmentId;
  appointments :any = [];
  patients:any = [];
  patientsLength ;
  appointmentsLength;
  TotalPatientsLength ;
  activeTab = 'upcomming';

  info: any;
  private roles: string[];
  currentTime: number = 0;
  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username: string;
  email: String;
  userId;
  photo;
  img: boolean;

  numbersOfOuvriers: any;

  constructor(private toastr: ToastrService,
              private tokenService: TokenStorageService,
              private crudApi: DashboardService,
              private router: Router,
              public commonService:CommonServiceService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getPatients();
    this.getAppointments();
    this.getNumberOfOuvriers();
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showModeratorBoard = this.roles.includes("ROLE_MODERATOR");
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.username = user.username;
      this.userId = user.id;
      this.photo = user.photo;
    }
  }

  getNumberOfOuvriers() {
    this.crudApi.countNumberOfOuvriers()
    .subscribe(res=>{
      this.numbersOfOuvriers = res;
    })
  }

  search(activeTab){
    this.activeTab = activeTab;
  }

  result(activeTab){
    this.activeTab = activeTab;
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
        this.toastr.success('', 'Updated successfully!');
        this.modalRef.hide();
        this.appointments = this.appointments.filter(a=>a.id != data.id);
        this.getPatients();
        this.getAppointments();
      })
   
  }

  decline() {
    delete this.appointmentId['patients']
    let data = {
      ...this.appointmentId
    }
    data['status'] = 'decline';
    this.commonService.updateAppointment(data,data.id)
      .subscribe(res=>{
        this.toastr.success('', 'Decline successfully!');
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
        this.appointmentsLength = this.appointments.length;
      })
  }

  getPatients() {
    this.commonService.getpatients()
    .subscribe(res=>{
      this.patients = res;
      this.TotalPatientsLength = this.patients.length;
    })
  }

  cancel() {
    this.modalRef.hide();
  }

}
