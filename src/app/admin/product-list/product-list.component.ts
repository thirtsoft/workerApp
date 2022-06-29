import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import { Address } from 'src/app/models/address';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products = [];
  addressList: any = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;
  formDataAddress = new Address();
  editForm: FormGroup;
  p : number=1;
  searchText;

  constructor(
    private commonService: CommonServiceService,
    private addService: AddressService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getAddressLists();
    this.editForm = this.fb.group({
      id: [''],
      name: [''],
      code: [''],
      country: [''],
      dataCreate: new Date(),
      dataUpdate: new Date(),
    } );
  }

  getProducts() {
    this.commonService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getAddressLists() {
    this.addService.getAllAddresss().subscribe(
      (data: any[]) => {
        this.addressList = data;
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

  save() {
    console.log(this.formDataAddress);
    this.addService.addAddress(this.formDataAddress)
    .subscribe(data => {
      this.modalRef.hide();
      this.getAddressLists();
    });
    this.modalRef.hide();
    this.formDataAddress = null;
  }

  editModal(template: TemplateRef<any>, category) {
    this.id = category.id;
    this.name = category.name;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  editAddressModal(template: TemplateRef<any>, add: Address) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.editForm.patchValue( {
      id: add.id,
      code: add.code,
      name: add.name,
      country: add.country,
      dataCreate: add.dataCreate,
      dataUpdate: add.dataUpdate
    });
  }

  updateAddress() {
    this.addService.updateAddress(this.editForm.value.id, this.editForm.value)
      .subscribe((data) => {
        this.toastr.success('avec succès','Information modifiée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.modalRef.hide();
        this.getAddressLists();
      });
    this.modalRef.hide();
  }

  update() {
    let params = {
      id: this.id,
      key: this.key,
      speciality: this.name,
    };
    this.modalRef.hide();
  }

  deleteAddressModal(template: TemplateRef<any>, add) {
    this.id = add.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteAddress() {
    this.addressList = this.addressList.filter((a) => a.id !== this.id);
    this.addService.deleteAddress(this.id).subscribe((data) => {
      this.toastr.error('avec succès','Address Supprimé', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getAddressLists();
    });
  }
 
  deleteProduct() {
    this.products = this.products.filter((a) => a.id !== this.id);
    this.commonService.deleteProduct(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getProducts();
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
