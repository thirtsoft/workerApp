import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Email } from 'src/app/models/email';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-vertical-form',
  templateUrl: './vertical-form.component.html',
  styleUrls: ['./vertical-form.component.css']
})
export class VerticalFormComponent implements OnInit {

  emailAddressList: any = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;
  formDataEmail = new Email();
  editForm: FormGroup;
  p : number=1;
  searchText;

  constructor(
    private mailService: EmailService,
    private toastr: ToastrService, 
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getEmailAddressLists();
    this.editForm = this.fb.group({
      id: [''],
      customerName: [''],
      recipient: [''],
      subject: [''],
      message: new Date(),
      dataUpdate: new Date(),
    } );
  }

  getEmailAddressLists() {
    this.mailService.getEmailsOrderByIdDesc().subscribe(
      (data: any[]) => {
        this.emailAddressList = data;
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

  editModal(template: TemplateRef<any>, category) {
    this.id = category.id;
    this.name = category.name;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  editEmailAddressModal(template: TemplateRef<any>, mail: Email) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.editForm.patchValue( {
      id: mail.id,
      customerName: mail.customerName,
      recipient: mail.recipient,
      subject: mail.subject,
      message: mail.message
    });
  }


  update() {
    let params = {
      id: this.id,
      key: this.key,
      speciality: this.name,
    };
    this.modalRef.hide();
  }

  deleteEmailAddressModal(template: TemplateRef<any>, add) {
    this.id = add.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteEmailAddress() {
    this.emailAddressList = this.emailAddressList.filter((a) => a.id !== this.id);
    this.mailService.deleteEmail(this.id).subscribe((data) => {
      this.toastr.error('avec succès','Email Supprimé', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getEmailAddressLists();
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
