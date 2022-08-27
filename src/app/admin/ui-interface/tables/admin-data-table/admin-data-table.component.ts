import { Component, OnInit, TemplateRef } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { HistoriqueLoginService } from 'src/app/services/historique-login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-data-table',
  templateUrl: './admin-data-table.component.html',
  styleUrls: ['./admin-data-table.component.css']
})
export class AdminDataTableComponent implements OnInit {

  historiqueLoginsList = [];
  modalRef: BsModalRef;
  errorMessage: string;
  id:any;

  constructor(public log: HistoriqueLoginService,
              private toastr: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getListHistoriqueLogins();
  }

  getListHistoriqueLogins() {
    this.log.getHistoriqueLoginsOrderByIdDesc().subscribe(
      (data: any[]) => {
        this.historiqueLoginsList = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  deleteHistoriqueLoginModal(template: TemplateRef<any>, prest) {
    this.id = prest.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteHistoriqueLogin() {
    this.historiqueLoginsList = this.historiqueLoginsList.filter((a) => a.id !== this.id);
    this.log.deleteHistoriqueLogin(this.id).subscribe((data: any[]) => {
      this.toastr.error('avec succès','HistoriqueLogin Supprimé', {
        timeOut: 2500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getListHistoriqueLogins();
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
