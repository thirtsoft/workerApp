import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/common-service.service';
import { Locality } from 'src/app/models/locality';
import { Ouvrier } from 'src/app/models/ouvrier';
import { Prestation } from 'src/app/models/prestation';
import { LocalityService } from 'src/app/services/locality.service';
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
  localitiesList = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  formDataPrestation = new Prestation();
  editForm: FormGroup;
  p : number=1;
  searchText;

  constructor(
    private crudApi: PrestationService,
    private ouvrierService: OuvrierService,
    private locService: LocalityService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getPrestationList();
    this.getOuvriersList();
    this.getLocalitiesList();
    this.editForm = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
      ouvrier: new FormControl(this.ouvrierList),
      locality: new FormControl(this.localitiesList)
    } );
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

  getLocalitiesList() {
    this.locService.getAllLocaliteDTOs().subscribe(
      (data: any[]) => {
        this.localitiesList = data;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    this.crudApi.addPrestation(this.formDataPrestation)
    .subscribe(data => {
      this.toastr.success('avec succès','Prestation Ajouté', {
        timeOut: 2500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getPrestationList();
    });
    this.modalRef.hide();
    this.formDataPrestation = null;
  }

  editPrestationModal(template: TemplateRef<any>, prest: Prestation) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.editForm.patchValue( {
      id: prest.id,
      title: prest.title,
      description: prest.description,
      ouvrier: prest.ouvrier,
      locality: prest.locality,
    });
  }

  compareOuvrier(o1: Ouvrier, o2: Ouvrier): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compareLocality(loc1: Locality, loc2: Locality): boolean {
    return loc1 && loc2 ? loc1.id === loc2.id : loc1 === loc2;
  }

  updatePrestation() {
    this.crudApi.updatePrestation(this.editForm.value.id, this.editForm.value)
      .subscribe((data) => {
        this.toastr.warning('avec succès','Prestation Modifié', {
          timeOut: 2500,
          positionClass: 'toast-top-right',
        });
        this.modalRef.hide();
        this.getPrestationList();
      });
    this.modalRef.hide();
  }

  deletePrestationModal(template: TemplateRef<any>, prest) {
    this.id = prest.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deletePrestation() {
    this.prestationList = this.prestationList.filter((a) => a.id !== this.id);
    this.crudApi.deletePrestation(this.id).subscribe((data: any[]) => {
      this.toastr.error('avec succès','Prestation Supprimé', {
        timeOut: 2500,
        positionClass: 'toast-top-right',
      });
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
