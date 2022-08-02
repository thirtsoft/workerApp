import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonServiceService } from 'src/app/common-service.service';
import { Prestation } from 'src/app/models/prestation';
import { OuvrierService } from 'src/app/services/ouvrier.service';
import { PrestationService } from 'src/app/services/prestation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  speciality = [];
  prestationList = [];
  ouvrierList = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  formDataPrestation = new Prestation();
  editForm: FormGroup;

  reference;
  designation;
  photoMetier;
  description;
  p : number=1;
  searchText;

  constructor(
    private commonService: CommonServiceService,
    private crudApi: PrestationService,
    private ouvrierService: OuvrierService,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getSpecialityList();
    this.getPrestationList();
    this.getOuvriersList();
    this.editForm = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
      ouvrier: [''],
    } );
  }

  getSpecialityList() {
    this.commonService.getSpeciality().subscribe(
      (data: any[]) => {
        this.speciality = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getPrestationList() {
    this.crudApi.getAllPrestationOrderByIdDesc().subscribe(
      (data: any[]) => {
        this.prestationList = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getOuvriersList() {
    this.ouvrierService.getAllOuvriers().subscribe(
      (data: any[]) => {
        this.ouvrierList = data;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editModal(template: TemplateRef<any>, special) {
    this.id = special.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editPrestationModal(template: TemplateRef<any>, prest: Prestation) {
 //   this.id = metier.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.editForm.patchValue( {
      id: prest.id,
      title: prest.title,
      description: prest.description,
      ouvrier: prest.ouvrier,
    });
  }

  deleteModal(template: TemplateRef<any>, special) {
    this.id = special.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deletePrestationModal(template: TemplateRef<any>, prest) {
    this.id = prest.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  save() {
    console.log(this.formDataPrestation);
    this.crudApi.addPrestation(this.formDataPrestation)
    .subscribe(data => {
      this.modalRef.hide();
      this.getPrestationList();
    });
    this.modalRef.hide();
    this.formDataPrestation = null;
  }

  update() {
    let params = {
      id: this.id,
      key: this.key,
      speciality: this.name,
    };
    this.modalRef.hide();
  }

  updatePrestation() {
    this.crudApi.updatePrestation(this.editForm.value.id, this.editForm.value)
      .subscribe((data) => {
        this.modalRef.hide();
        this.getPrestationList();
      });
    this.modalRef.hide();
  }

  deleteSpeciality() {
    this.speciality = this.speciality.filter((a) => a.id !== this.id);
    this.commonService.deleteSpeciality(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getSpecialityList();
    });
  }

  deletePrestation() {
    this.prestationList = this.prestationList.filter((a) => a.id !== this.id);
    this.crudApi.deletePrestation(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getPrestationList();
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
