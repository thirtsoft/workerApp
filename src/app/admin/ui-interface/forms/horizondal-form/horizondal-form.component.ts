import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { Locality } from 'src/app/models/locality';
import { AddressService } from 'src/app/services/address.service';
import { LocalityService } from 'src/app/services/locality.service';

@Component({
  selector: 'app-horizondal-form',
  templateUrl: './horizondal-form.component.html',
  styleUrls: ['./horizondal-form.component.css']
})
export class HorizondalFormComponent implements OnInit {

  localitiesList = [];
  addressesList = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  formDataLocality = new Locality();
  editForm: FormGroup;
  p : number=1;
  searchText;

  constructor(
    private crudApi: LocalityService,
    private addService: AddressService,    
    private modalService: BsModalService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getLocalitiesList();
    this.getAddressesList();
    this.editForm = this.fb.group({
      id: [''],
      name: [''],
      rue: [''],
      codePostal: [''],
      address: new FormControl(this.addressesList)
    } );
  }

  getLocalitiesList() {
    this.crudApi.getLocaliteDTOOrderByIdDesc().subscribe(
      (data: any[]) => {
        this.localitiesList = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getAddressesList() {
    this.addService.getAllAddresss().subscribe(
      (data: any[]) => {
        this.addressesList = data;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    this.crudApi.addLocalityDTO(this.formDataLocality)
    .subscribe(data => {
      this.toastr.success('avec succès','Locality Ajouté', {
        timeOut: 2500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getLocalitiesList();
    });
    this.modalRef.hide();
    this.formDataLocality = null;
  }

  editLocalityModal(template: TemplateRef<any>, loc: Locality) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.editForm.patchValue( {
      id: loc.id,
      name: loc.name,
      rue: loc.rue,
      codePostal: loc.codePostal,
      address: loc.address,
    });
  }

  compareAddress(a1: Address, a2: Address): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
  }


  updateLocality() {
    this.crudApi.updateLocalityDTO(this.editForm.value.id, this.editForm.value)
      .subscribe((data) => {
        this.toastr.warning('avec succès','Locality Modifié', {
          timeOut: 2500,
          positionClass: 'toast-top-right',
        });
        this.modalRef.hide();
        this.getLocalitiesList();
      });
    this.modalRef.hide();
  }

  deleteLocalityModal(template: TemplateRef<any>, prest) {
    this.id = prest.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteLocality() {
    this.localitiesList = this.localitiesList.filter((a) => a.id !== this.id);
    this.crudApi.deleteLocalityDTO(this.id).subscribe((data: any[]) => {
      this.toastr.error('avec succès','Locality Supprimé', {
        timeOut: 2500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getLocalitiesList();
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
