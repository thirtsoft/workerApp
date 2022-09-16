import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent implements OnInit {

  id;
  doctorDetails;
  dataFormMail: FormGroup;
  isSent = false;

  constructor(public crupdApi: EmailService,
              public fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService
  ) {}

  get f() { return this.dataFormMail.controls; }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.id = this.route.snapshot.queryParams['id'];
    this.infoForm();
  }

  infoForm() {
    const validatorString = '^[a-zA-Z,.!?\\s-]*$';
    this.dataFormMail = this.fb.group({
    //  id: 0,
      customerName: ['', [Validators.required]],
      customerEmail: ['', [Validators.required]],
      recipient: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],

    });
  }

  sendMailToManager() {
    console.log(this.dataFormMail.value);
    this.crupdApi.senEmailToManager(this.dataFormMail.value)
      .subscribe(response => {
        this.toastr.success('on vous recontacte','Nous avons bien reçu votre email', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.isSent = true;
        this.router.navigate(['/contact']);
      },
        (error: HttpErrorResponse) => {
          this.toastr.error("Désolé votre email n'a pas été envoyé, veuillez vérifier");
          this.isSent = false;
        }
      );
    

  }

}
