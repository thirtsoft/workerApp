import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from '../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { Register } from '../services/auth/models/register';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/security/auth.service';

declare const $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name = '';
  mobile = '';
  password = '';
  isPatient: boolean = true;
  doctors: any = [];
  patients: any = [];
  reg_type = 'Patient Register';
  doc_patient = 'Are you a Doctor?';

  registrationForm: FormGroup;
  user = new Register('','','','',[]);
  submitted = false;
  isRegistered = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: any = [
    { name: 'User', id:1, selected: true },
    { name: 'Manager', id:2, selected: false },
    { name: 'Admin', id:3, selected: false },
  ];
  selectedRoles: string[];


  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    public commonService: CommonServiceService,
    public router: Router
  ) {}

  ngOnInit(): void {
    /*
    this.getpatients();
    this.getDoctors();
    if($('.floating').length > 0 ){
      $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
      }).trigger('blur');
    } */

    this.registrationForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required, 
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      roleSelection: this.createRoles(this.roles),
    });
  }

  createRoles(rolesList): FormArray {
    const arr = rolesList.map(role => {
      return new FormControl(role.selected)
    });
    console.log("CreateRole:" +arr);
    return new FormArray(arr);
  }

  onSubmit() {
    this.submitted = true;
    this.user.name = this.registrationForm.value.name;
    this.user.username = this.registrationForm.value.username;
    this.user.email = this.registrationForm.value.email;
    this.user.password = this.registrationForm.value.password;
    console.log("SelectedRole: " +this.getSelectedRoles());
    this.user.roles = this.getSelectedRoles();
    this.registerUser();
  }

  registerUser() {
    console.log(this.user);
    this.authService.signUp(this.user)
    .subscribe(response=> {
      console.log(response);
      this.isRegistered = true;
      this.isSignUpFailed = false;          
      this.toastr.success('avec succès!','Vote compte est crée', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("login-page").then(() => {
          window.location.reload();
        });
    //    this.router.navigateByUrl("auth/success-register");
    },
    error => {
      this.errorMessage = error.error.message;
      this.toastr.error("Veuillez remplir tous les champs");
      this.isSignUpFailed = true;
    }
    );
  }

  getSelectedRoles():string[]  {
    this.selectedRoles = this.registrationForm.value.roleSelection.map((selected:any, i) => {
      console.log("IsSelected: " +selected);
      if(selected){
        return this.roles[i].name;
      }else {
        return '';
      }
    });
    return this.selectedRoles.filter(function (element) {
      if (element !== '') {
        console.log("ElementReturn: " +element);
        return element;
      }
    });
  }

  changeRegType() {
    if (this.reg_type === 'Doctor Register') {
      this.reg_type = 'Patient Register';
      this.doc_patient = 'Are you a Doctor?';
      this.isPatient = true;
    } else {
      this.reg_type = 'Doctor Register';
      this.doc_patient = 'Not a Doctor?';
      this.isPatient = false;
    }
  }

  signup() {
    if (this.name === '' || this.mobile === '' || this.password === '') {
      this.toastr.error('', 'Please enter mandatory field!');
    } else {
      if (!this.isPatient) {
        let params = {
          id: this.doctors.length + 1,
          doctor_name: this.name,
          password: this.password,
        };
        this.commonService.createDoctor(params).subscribe((res) => {
          this.toastr.success('', 'Register successfully!');
          this.router.navigate(['/doctor-register-step1']);
        });
      } else {
        let params = {
          id: this.patients.length + 1,
          name: this.name,
          password: this.password,
        };
        this.commonService.createPatient(params).subscribe((res) => {
          this.toastr.success('', 'Register successfully!');
          this.router.navigate(['/patient-register-step1']);
        });
      }
    }
  }

  getDoctors() {
    this.commonService.getDoctors().subscribe((res) => {
      this.doctors = res;
    });
  }

  getpatients() {
    this.commonService.getpatients().subscribe((res) => {
      this.patients = res;
    });
  }
}
