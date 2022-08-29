import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonServiceService } from '../../common-service.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import { OuvrierService } from 'src/app/services/ouvrier.service';
import { Ouvrier } from 'src/app/models/ouvrier';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Metier } from 'src/app/models/metier';
import { Address } from 'src/app/models/address';
import { MetierService } from 'src/app/services/metier.service';
import { AddressService } from 'src/app/services/address.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Locality } from 'src/app/models/locality';
import { LocalityService } from 'src/app/services/locality.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  ouvriersList: any = [];
  metiersList: any = [];
  localityList: any = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;
  formDataOuvrier: Ouvrier = new Ouvrier();
  editForm: FormGroup;
  viewForm: FormGroup;
  mailForm: FormGroup;
  p : number=1;
  searchText;

  ouvrierPhotoFile: File;
  ouvrierCvFile: File;

  submitted = false;
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

  constructor(
    public ouvService: OuvrierService,
    private metService: MetierService,
    private locService: LocalityService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getOuvriersList();
    this.getMetiersList();
    this.getLocalitiesList();

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
      metier: new FormControl(this.metiersList),
      locality: new FormControl(this.localityList),
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
      metier: new FormControl(this.metiersList),
      locality: new FormControl(this.localityList),
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

  getLocalitiesList() {
    this.locService.getAllLocaliteDTOs()
      .subscribe(res => {
        this.localityList = res;
      },
      error => this.errorMessage = <any>error);
  }

  getTS() {
    return this.currentTime;
  }

  selectPhotoFile(event) {
    const photofile = event.target.files[0];
    this.ouvrierPhotoFile = photofile;
  }

  selectCvFile(event) {
    const cvfile = event.target.files[0];
    this.ouvrierCvFile = cvfile;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

 /*  save() {
    this.ouvService.addOuvrier(this.formDataOuvrier)
    .subscribe(data => {
      this.toastr.success('avec succès','Ouvrier Ajoutée', {
        timeOut: 2500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getOuvriersList();
    });
    this.modalRef.hide();
    this.formDataOuvrier = null;
  } */

  onSaveOuvrierWithFiles() {
    let formData = new FormData();
    this.currentPhotoFileUpload = this.ouvrierPhotoFile;
    this.currentCvFileUpload = this.ouvrierCvFile;
    formData.append('ouvrier', JSON.stringify(this.formDataOuvrier));
    formData.append('photoOuvrier', this.currentPhotoFileUpload);
    formData.append('cvOuvrier', this.currentCvFileUpload);
    this.ouvService.addOuvrierWithPhotoAndCvFileInFolder(formData)
      .subscribe((response: Ouvrier)=> {
        this.toastr.success('avec succès','Ouvrier Ajoutée', {
          timeOut: 2500,
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
      locality: ouvrier.locality
    });
  }

  compareMetier(c1: Metier, c2: Metier): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareLocality(loc1: Locality, loc2: Locality): boolean {
    return loc1 && loc2 ? loc1.id === loc2.id : loc1 === loc2;
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
      locality: ouvrier.locality
    });
  }

  updateOuvrier() {
    this.ouvService.updateOuvrier(this.editForm.value.id, this.editForm.value)
      .subscribe((data) => {
        this.toastr.success('avec succès','Information modifiée', {
          timeOut: 2500,
          positionClass: 'toast-top-right',
        });
        this.modalRef.hide();
        this.getOuvriersList();
      });
    this.modalRef.hide();
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
    const photofile = event.target.files[0];
    this.ouvrierPhotoFile = photofile;
  } 

  processForm() {
    this.progress = 0;
    this.currentPhotoFileUpload = this.ouvrierPhotoFile;
    this.ouvService.uploadPhotoOfOuvrierInFolder(this.currentPhotoFileUpload, this.editForm.value.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          this.toastr.success('avec succès','Photo remplacé', {
            timeOut: 2500,
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
    const cvfile = event.target.files[0];
    this.ouvrierCvFile = cvfile;
  } 

  processCvForm() {
    this.progress = 0;
    this.currentCvFileUpload = this.ouvrierCvFile;
    this.ouvService.uploadCvOfOuvrierInFolder(this.currentCvFileUpload, this.editForm.value.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          this.toastr.success('avec succès','CV remplacé', {
            timeOut: 2500,
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
        timeOut: 2500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getOuvriersList();
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
