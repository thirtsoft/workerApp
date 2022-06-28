import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonServiceService } from '../../common-service.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import { OuvrierService } from 'src/app/services/ouvrier.service';
import { Ouvrier } from 'src/app/models/ouvrier';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Metier } from 'src/app/models/metier';
import { Address } from 'src/app/models/address';
import { MetierService } from 'src/app/services/metier.service';
import { AddressService } from 'src/app/services/address.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patientsList: any = [];
  ouvriersList: any = [];
  metiersList: any = [];
  addressList: any = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;
  formDataOuvrier = new Ouvrier();
  editForm: FormGroup;
  viewForm: FormGroup;
  mailForm: FormGroup;
  p : number=1;
  searchText;

  ouvrierPhotoFile;
  ouvrierCvFile;
  data;
  paramId :any = 0;
  mySubscription: any;
  editPhoto: boolean;
  editCv: boolean;
  currentProfile: any;
  selectedFiles;
  progress: number;
  currentPhotoFileUpload: any;
  currentCvFileUpload: any;
  currentTime: number = 0;
  userId;
  img: boolean;

  constructor(public commonService: CommonServiceService,
    public ouvService: OuvrierService,
    private metService: MetierService,
    private addService: AddressService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getPatients();
    this.getOuvriersList();
    this.getMetiersList();
    this.getAddressesList();
    this.editForm = this.fb.group({
      id: [''],
      reference: [''],
      firstName: [''],
      lastName: [''],
      sexe: [''],
      addressActuel: [''],
      email: [''],
      phoneOuvrier: [''],
      nbreAnneeExperience: [''],
      pretentionSalaire: [''],
      disponibity: [''],
      education: [''],
      description: [''],
      selected: [''],
      mobilite: [''],
      cvOuvrier: [''],
      photoOuvrier: [''],
      dateInscription: [''],
      metier: new Metier(),
      address: new Address()
    } );

    this.viewForm = this.fb.group({
      id: [''],
      reference: [''],
      firstName: [''],
      lastName: [''],
      sexe: [''],
      addressActuel: [''],
      email: [''],
      phoneOuvrier: [''],
      nbreAnneeExperience: [''],
      pretentionSalaire: [''],
      disponibity: [''],
      education: [''],
      description: [''],
      selected: [''],
      mobilite: [''],
      cvOuvrier: [''],
      photoOuvrier: [''],
      dateInscription: [''],
      metier: new Metier(),
      address: new Address()
    } );

    this.mailForm = this.fb.group({
      id: [''],
      email: [''],
      subject: [''],
      message: [''],
    } );
  }

  getOuvriersList() {
    this.ouvService.getOuvrierOrderByIdDesc()
      .subscribe(res => {
        this.ouvriersList = res;
        $(function () {
          $("table").DataTable();
        });
      },
        error => this.errorMessage = <any>error);
  }

  getMetiersList() {
    this.metService.getMetiers()
      .subscribe(res => {
        this.metiersList = res;
      },
        error => this.errorMessage = <any>error);
  }

  getAddressesList() {
    this.addService.getAllAddresss()
      .subscribe(res => {
        this.addressList = res;
        console.log(this.addressList);
      },
        error => this.errorMessage = <any>error);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  viewOuvrierModal(template: TemplateRef<any>, ouvrier: Ouvrier) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.viewForm.patchValue( {
      id: ouvrier.id,
      reference: ouvrier.reference,
      firstName: ouvrier.firstName,
      lastName: ouvrier.lastName,
      sexe: ouvrier.sexe,
      addressActuel: ouvrier.addressActuel,
      email: ouvrier.email,
      phoneOuvrier: ouvrier.phoneOuvrier,
      nbreAnneeExperience: ouvrier.nbreAnneeExperience,
      pretentionSalaire: ouvrier.pretentionSalaire,
      disponibity: ouvrier.disponibity,
      education: ouvrier.education,
      description: ouvrier.description,
      selected: ouvrier.selected,
      mobilite: ouvrier.mobilite,
      cvOuvrier: ouvrier.cvOuvrier,
      photoOuvrier: ouvrier.photoOuvrier,
      dateInscription: ouvrier.dateInscription,
      metier: ouvrier.metier,
      address: ouvrier.address
    });
  }


  editOuvrierModal(template: TemplateRef<any>, ouvrier: Ouvrier) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.editForm.patchValue( {
      id: ouvrier.id,
      reference: ouvrier.reference,
      firstName: ouvrier.firstName,
      lastName: ouvrier.lastName,
      sexe: ouvrier.sexe,
      addressActuel: ouvrier.addressActuel,
      email: ouvrier.email,
      phoneOuvrier: ouvrier.phoneOuvrier,
      nbreAnneeExperience: ouvrier.nbreAnneeExperience,
      pretentionSalaire: ouvrier.pretentionSalaire,
      disponibity: ouvrier.disponibity,
      education: ouvrier.education,
      description: ouvrier.description,
      selected: ouvrier.selected,
      mobilite: ouvrier.mobilite,
      cvOuvrier: ouvrier.cvOuvrier,
      photoOuvrier: ouvrier.photoOuvrier,
      dateInscription: ouvrier.dateInscription,
      metier: ouvrier.metier,
      address: ouvrier.address
    });
  }

  deleteOuvrierModal(template: TemplateRef<any>, ouvrier) {
    this.id = ouvrier.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteOuvrier() {
    this.ouvriersList = this.ouvriersList.filter((a) => a.id !== this.id);
    this.ouvService.deleteOuvrier(this.id).subscribe((data) => {
      this.toastr.error('avec succès','Ouvrier Supprimé', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getOuvriersList();
    });
  }

  getPatients() {
    this.commonService.getpatients()
      .subscribe(res => {
        this.patientsList = res;
        $(function () {
          $("table").DataTable();
        });
      },
        error => this.errorMessage = <any>error);
  }

  save() {
    console.log(this.formDataOuvrier);
    this.ouvService.addOuvrier(this.formDataOuvrier)
    .subscribe(data => {
      this.modalRef.hide();
      this.getOuvriersList();
    });
    this.modalRef.hide();
    this.formDataOuvrier = null;
  }

  onSaveOuvrierWithFiles() {
    let formData = new FormData();
    this.currentPhotoFileUpload = this.ouvrierPhotoFile.item(0)
    this.currentCvFileUpload = this.ouvrierCvFile.item(0)
    console.log(this.currentPhotoFileUpload);
    console.log(this.currentCvFileUpload);
    
    formData.append('ouvrier', JSON.stringify(this.formDataOuvrier));
    formData.append('photoOuvrier', this.currentPhotoFileUpload);
    formData.append('cvOuvrier', this.currentCvFileUpload);
    console.log("FormData--", formData);
    this.ouvService.addOuvrierWithPhotoAndCvFileInFolder(formData)
      .subscribe((response: Ouvrier)=> {
        console.log('Response--', response);
        this.toastr.success('avec succès','Ouvrier Ajoutée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.modalRef.hide();
        this.getOuvriersList();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  updateOuvrier() {
    this.ouvService.updateOuvrier(this.editForm.value.id, this.editForm.value)
      .subscribe((data) => {
        this.toastr.success('avec succès','Information modifiée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.modalRef.hide();
        this.getOuvriersList();
      });
    this.modalRef.hide();
  }

  getTS() {
    return this.currentTime;
  }

  onEditPhoto(p) {
    if(this.paramId  && this.paramId  > 0){
      this.paramId = p;
      this.editPhoto=true;
      this.editCv=true;
    }
    this.editPhoto=false;
    this.editCv=false;
  }

  onSelectPhotoFile(event) {
    this.ouvrierPhotoFile=event.target.files;
  } 

  processForm() {
    this.progress = 0;
    this.currentPhotoFileUpload = this.ouvrierPhotoFile.item(0)
    console.log(this.currentPhotoFileUpload);
    console.log(this.paramId);
    this.ouvService.uploadPhotoOfOuvrierInFolder(this.currentPhotoFileUpload, this.formDataOuvrier.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          this.toastr.success('avec succès','Photo remplacé', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.modalRef.hide();
          this.getOuvriersList();
        } else if (event instanceof HttpResponse) {
          this.editPhoto=false;
          this.currentTime = Date.now();
        }
      }, err => {
        this.toastr.warning("Problème de chargment de la photo");
      }
    );
    this.ouvrierPhotoFile = undefined;
  }

  onSelectCvFile(event) {
    this.ouvrierCvFile=event.target.files;
  } 

  processCvForm() {
    this.progress = 0;
    this.currentCvFileUpload = this.ouvrierCvFile.item(0)
    console.log(this.currentCvFileUpload);
    console.log(this.paramId);
    this.ouvService.uploadCvOfOuvrierInFolder(this.currentCvFileUpload, this.formDataOuvrier.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          this.toastr.success('avec succès','CV remplacé', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.modalRef.hide();
          this.getOuvriersList();
        } else if (event instanceof HttpResponse) {
          this.editCv=false;
          this.currentTime = Date.now();
        }
      }, err => {
        this.toastr.warning("Problème de chargment du cv");
      }
    );
    this.ouvrierCvFile = undefined;
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
