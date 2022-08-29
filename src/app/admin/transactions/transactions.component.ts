import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../common-service.service';
import * as $ from 'jquery';
import { JetonService } from 'src/app/services/jeton.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Jeton } from 'src/app/models/jeton';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  modalRef: BsModalRef;
  transactionsList: any = [];
  jetonsList: any = [];
  utilisateurList: any = [];
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

  formDataJeton = new Jeton();
  editForm: FormGroup;
  editEtatForm: FormGroup;
  viewForm: FormGroup;

  constructor(public commonService: CommonServiceService, 
              private modalService: BsModalService,
              private crudApi: JetonService,
              private userService: UtilisateurService,
              public toastr: ToastrService,
              private tokenService: TokenStorageService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  //  this.getTransactions();
    this.getJetonsList();
    this.getUtilisateurList();
    this.editEtatForm = this.fb.group({
      id: [''],
      etat: ['']
    } );
    this.editForm = this.fb.group({
      id: [''],
      montant: [''],
      utilisateur: new FormControl(this.utilisateurList),
    });
  }

  getJetonsList() {
    this.crudApi.getJetonsOrderByIdDesc()
      .subscribe(res => {
        this.jetonsList = res;
        $(function () {
          $("table").DataTable();
        });
      },
        error => this.errorMessage = <any>error);
  }

  getUtilisateurList() {
    this.userService.getALLUtilisateurs()
      .subscribe(res => {
        this.utilisateurList = res;
        $(function () {
          $("table").DataTable();
        });
      },
        error => this.errorMessage = <any>error);
  }
  
  openJetonModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    this.crudApi.addJeton(this.formDataJeton)
    .subscribe( data => {
      this.toastr.success('avec succès','Jeton Ajouté', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getJetonsList();
  });
    this.modalRef.hide();
    this.formDataJeton = null;
  }

  editEtatModal(template: TemplateRef<any>, jet: Jeton) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.editEtatForm.patchValue( {
     id: jet.id,
     etat: jet.etat
    });
  }

  updateEtat() {
    this.crudApi.updateEtatOfJeton(this.editEtatForm.value.id, this.editEtatForm.value.etat)
      .subscribe((data) => {
        this.modalRef.hide();
        this.toastr.success('avec succès','Etat Modifié', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
       this.getJetonsList();
      })
  }


  editJetonModal(template: TemplateRef<any>, jet: Jeton) {
       this.modalRef = this.modalService.show(template, {
         class: 'modal-lg modal-dialog-centered',
       });
       this.editForm.patchValue( {
        id: jet.id,
        montant: jet.montant,
        utilisateur: jet.utilisateur,
      });
      console.log(this.editForm);
       /*
       this.editForm.patchValue( {
         id: jet.id,
         montant: jet.montant,
         utilisateur: jet.utilisateur,
       });
       */
  }

  
  compareFn(c1: Utilisateur, c2: Utilisateur): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  update() {
    this.crudApi.updateJeton(this.editForm.value.id, this.editForm.value)
      .subscribe((data) => {
        this.toastr.warning('avec succès','Jeton Modifié', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.modalRef.hide();
        this.getJetonsList();
      });
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
      this.toastr.error('avec succès','Jeton Supprimé', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
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
