import { Component, OnInit, TemplateRef } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonServiceService } from 'src/app/common-service.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  /* datatable: any;
  constructor() { }

  ngOnInit(): void {
    const table: any = $('table');
    this.datatable = table.DataTable();
  } */

  reviews: any = [];
  appointmentsList: any = [];
  errorMessage: string;
  modalRef: BsModalRef;
  id;
  p: number=1;
  searchText: any;
  maxRatingValue = 5;


  constructor(public commonService: CommonServiceService,
              public crudApi: AppointmentService,
              public router: Router,
              public toastr: ToastrService,
              private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getReviews();
    this.getAppointmentsList();
  }

  deleteModal(template: TemplateRef<any>, special) {
    let data = this.reviews.filter(a => a.id === special.id);
    this.id = data[0].id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
  }

  deleteAppointmentModal(template: TemplateRef<any>, appoint) {
    let data = this.appointmentsList.filter(a => a.id === appoint.id);
    this.id = data[0].id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
  }

  getReviews() {
    this.commonService.getReviews()
      .subscribe(res => {
        this.reviews = res;
        $(function () {
          $("table").DataTable();
        });
      },
        error => this.errorMessage = <any>error);
  }

  getAppointmentsList() {
    this.crudApi.getAllAppointmentOrderByIdDesc()
      .subscribe(res => {
        this.appointmentsList = res;
        console.log(this.appointmentsList);
        $(function () {
          $("table").DataTable();
        });
      },
        error => this.errorMessage = <any>error);
  }

  deleteReview() {
    this.commonService.deleteReview(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getReviews();
    });
  }

  deleteAppointment() {
    this.crudApi.deleteAppointment(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getAppointmentsList();
    });
  }

  decline() {
    this.modalRef.hide();
  }

  btnColor() {
    document.getElementById('btn-yes').style.backgroundColor = "#00d0f1";
    document.getElementById('btn-yes').style.border = "1px solid #00d0f1";
    document.getElementById('btn-yes').style.color = "#fff";

    document.getElementById('btn-no').style.backgroundColor = "#fff";
    document.getElementById('btn-no').style.border = "1px solid #fff";
    document.getElementById('btn-no').style.color = "#000";
  }

  btnColorNo() {
    document.getElementById('btn-no').style.backgroundColor = "#00d0f1";
    document.getElementById('btn-no').style.border = "1px solid #00d0f1";
    document.getElementById('btn-no').style.color = "#fff";

    document.getElementById('btn-yes').style.backgroundColor = "#fff";
    document.getElementById('btn-yes').style.border = "1px solid #fff";
    document.getElementById('btn-yes').style.color = "#000";
  }


}
