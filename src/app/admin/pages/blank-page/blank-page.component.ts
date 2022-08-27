import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/common-service.service';
import { Ouvrier } from 'src/app/models/ouvrier';
import { ServiceOffert } from 'src/app/models/service-offert';
import { OuvrierService } from 'src/app/services/ouvrier.service';
import { ServiceOffertService } from 'src/app/services/service-offert.service';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.css']
})
export class BlankPageComponent implements OnInit {

  servicesOffertList = [];
  ouvrierList = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  formDataServiceOffert = new ServiceOffert();
  editForm: FormGroup;

  reference;
  designation;
  photoMetier;
  description;
  p : number=1;
  searchText;

  constructor(
    private commonService: CommonServiceService,
    private crudApi: ServiceOffertService,
    private ouvrierService: OuvrierService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getServiceOffertsList();
    this.getOuvriersList();
    this.editForm = this.fb.group({
      id: [''],
      reference: [''],
      designation: [''],
      description: [''],
      ouvrier: new FormControl(this.ouvrierList),
    });
  }

  getServiceOffertsList() {
    this.crudApi.getAllServiceOffertOrderByIdDesc().subscribe(
      (data: any[]) => {
        this.servicesOffertList = data;
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

  save() {
    this.crudApi.addServiceOffert(this.formDataServiceOffert)
    .subscribe(data => {
      this.toastr.success('avec succès','Jeton Ajouté', {
        timeOut: 2500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getServiceOffertsList();
    });
    this.modalRef.hide();
    this.formDataServiceOffert = null;
  }

  editModal(template: TemplateRef<any>, special) {
    this.id = special.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editServiceOffertModal(template: TemplateRef<any>, service: ServiceOffert) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.editForm.patchValue( {
      id: service.id,
      reference: service.reference,
      designation: service.designation,
      description: service.description,
      ouvrier: service.ouvrier,
    });
  }

  compareFn(c1: Ouvrier, c2: Ouvrier): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  updateServiceOffert() {
    this.crudApi.updateServiceOffert(this.editForm.value.id, this.editForm.value)
      .subscribe((data) => {
        this.toastr.warning('avec succès','Service Modifié', {
          timeOut: 2500,
          positionClass: 'toast-top-right',
        });
        this.modalRef.hide();
        this.getServiceOffertsList();
      });
  }

  deleteServiceOffertModal(template: TemplateRef<any>, prest) {
    this.id = prest.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteServiceOffert() {
    this.servicesOffertList = this.servicesOffertList.filter((a) => a.id !== this.id);
    this.crudApi.deleteServiceOffert(this.id).subscribe((data: any[]) => {
      this.toastr.error('avec succès','Service Supprimé', {
        timeOut: 2500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getServiceOffertsList();
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
