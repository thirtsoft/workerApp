import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../common-service.service';
import * as $ from 'jquery';
import { JetonService } from 'src/app/services/jeton.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  modalRef: BsModalRef;
  transactionsList: any = [];
  jetonsList: any = [];
  errorMessage: string;
  id;

  roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showGestionnaireBoard = false;
  showUserBoard = false;
  p : number=1;
  searchText;

  constructor(public commonService: CommonServiceService, private modalService: BsModalService,
    private crudApi: JetonService,
      public toastr: ToastrService,
      private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.getTransactions();
    this.getJetonsList();
  }

  getJetonsList() {
    this.crudApi.getAllJetons()
      .subscribe(res => {
        this.jetonsList = res;
        $(function () {
          $("table").DataTable();
        });
      },
        error => this.errorMessage = <any>error);
  }

  deleteModal(template: TemplateRef<any>, trans) {
    this.id = trans.id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
  }

  deleteJetonModal(template: TemplateRef<any>, jet) {
    this.id = jet.id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
  }

  deleteJeton() {
    this.crudApi.deleteJeton(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getJetonsList();
    });
  }

  deleteTrans() {
    this.transactionsList = this.transactionsList.filter(a => a.id !== this.id);
    this.modalRef.hide();
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

  getTransactions() {
    this.commonService.getTransactions()
      .subscribe(res => {
        this.transactionsList = res;
        $(function () {
          $("table").DataTable();
        });
      },
        error => this.errorMessage = <any>error);
  }

}
