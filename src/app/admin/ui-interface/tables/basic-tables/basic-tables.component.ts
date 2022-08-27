import { Component, OnInit, TemplateRef } from '@angular/core';
import { Route } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HistoriqueAppointmentService } from 'src/app/services/historique-appointment.service';

@Component({
  selector: 'app-basic-tables',
  templateUrl: './basic-tables.component.html',
  styleUrls: ['./basic-tables.component.css']
})
export class BasicTablesComponent implements OnInit {

  historiqueAppointmentsList = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  constructor(
    private crudApi: HistoriqueAppointmentService,
    private modalService: BsModalService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getHistoriqueAppointmentList();
  }

  getHistoriqueAppointmentList() {
    this.crudApi.getHistoriqueAppointmentsOrderByIdDesc().subscribe(
      (data: any[]) => {
        this.historiqueAppointmentsList = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  deleteHistoriqueAppointmentModal(template: TemplateRef<any>, prest) {
    this.id = prest.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteHistoriqueAppointment() {
    this.historiqueAppointmentsList = this.historiqueAppointmentsList.filter((a) => a.id !== this.id);
    this.crudApi.deleteHistoriqueAppointment(this.id).subscribe((data: any[]) => {
      this.toastr.error('avec succès','HistoriqueAppointment Supprimé', {
        timeOut: 2500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getHistoriqueAppointmentList();
    });
  }


  decline() {
    this.modalRef.hide();
  }

  btnColor() {
    document.getElementById('btn-yes').style.backgroundColor = '#00d0f1';
    document.getElementById('btn-yes').style.border = '1px solid #00d0f1';
    document.getElementById('btn-yes').style.color = '#fff';

    document.getElementById('btn-no').style.backgroundColor = '#fff';
    document.getElementById('btn-no').style.border = '1px solid #fff';
    document.getElementById('btn-no').style.color = '#000';
  }

  btnColorNo() {
    document.getElementById('btn-no').style.backgroundColor = '#00d0f1';
    document.getElementById('btn-no').style.border = '1px solid #00d0f1';
    document.getElementById('btn-no').style.color = '#fff';

    document.getElementById('btn-yes').style.backgroundColor = '#fff';
    document.getElementById('btn-yes').style.border = '1px solid #fff';
    document.getElementById('btn-yes').style.color = '#000';
  }


}
