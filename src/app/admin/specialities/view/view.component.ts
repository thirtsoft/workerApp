import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../../common-service.service';
import * as $ from 'jquery';
import { MetierService } from 'src/app/services/metier.service';
import { Metier } from 'src/app/models/metier';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  speciality = [];
  metierList = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  formDataMetier = new Metier();
  editForm: FormGroup;


  reference;
  designation;
  photoMetier;
  description;
  p : number=1;
  searchText;

  constructor(
    private commonService: CommonServiceService,
    private metService: MetierService,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getSpecialityList();
    this.getMetierList();
    this.editForm = this.fb.group({
      id: [''],
      reference: [''],
      designation: [''],
      description: ['']
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

  getMetierList() {
    this.metService.getMetierOrderByIdDesc().subscribe(
      (data: any[]) => {
        this.metierList = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
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

  editMetierModal(template: TemplateRef<any>, metier: Metier) {
 //   this.id = metier.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.editForm.patchValue( {
      id: metier.id,
      reference: metier.reference,
      designation: metier.designation,
      description: metier.description
    });
  }

  deleteModal(template: TemplateRef<any>, special) {
    this.id = special.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteMetierModal(template: TemplateRef<any>, metier) {
    this.id = metier.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  save() {
    console.log(this.formDataMetier);
    this.metService.addMetier(this.formDataMetier)
    .subscribe(data => {
      this.modalRef.hide();
      this.getMetierList();
    });
    this.modalRef.hide();
    this.formDataMetier = null;
  }

  update() {
    let params = {
      id: this.id,
      key: this.key,
      speciality: this.name,
    };
    this.modalRef.hide();
  }

  updateMetier() {
    this.metService.updateMetier(this.editForm.value.id, this.editForm.value)
      .subscribe((data) => {
        this.modalRef.hide();
        this.getMetierList();
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

  deleteMetier() {
    this.metierList = this.metierList.filter((a) => a.id !== this.id);
    this.metService.deleteMetier(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getMetierList();
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
