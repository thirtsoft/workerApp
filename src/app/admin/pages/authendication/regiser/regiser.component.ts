import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/services/auth/models/register';
import { AuthService } from 'src/app/services/auth/security/auth.service';

@Component({
  selector: 'app-regiser',
  templateUrl: './regiser.component.html',
  styleUrls: ['./regiser.component.css']
})
export class RegiserComponent implements OnInit {

  registrationForm: FormGroup;
  user = new Register('','','','',[]);
  submitted = false;
  isRegistered = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: any = [
    { name: 'User', id:1, selected: true },
    { name: 'Moderator', id:2, selected: false },
    { name: 'Manager', id:3, selected: false },
    { name: 'Admin', id:4, selected: false },
  ];

  selectedRoles: string[];

  constructor(private authService: AuthService,
              private toastr :ToastrService,
              private router : Router
  ) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      roleSelection: this.createRoles(this.roles),
    });
  }

  createRoles(rolesList): FormArray {
    const arr = rolesList.map(role => {
      return new FormControl(role.selected)
    });
    return new FormArray(arr);
  }

  onSubmit() {
    this.submitted = true;
    this.user.name = this.registrationForm.value.name;
    this.user.username = this.registrationForm.value.username;
    this.user.email = this.registrationForm.value.email;
    this.user.password = this.registrationForm.value.password;
    this.user.roles = this.getSelectedRoles();
    this.registerUser();
  }

  registerUser() {
    this.authService.signUp(this.user)
    .subscribe(response=> {
      this.isRegistered = true;
      this.isSignUpFailed = false;
      this.toastr.success('crée avec succès','Compte employé', {
        timeOut: 2500,
        positionClass: 'toast-top-right',
      });
      this.router.navigateByUrl("admin/login-form");
    },
    error => {
      this.errorMessage = error.error.message;
      this.isSignUpFailed = true;
    });

  }

  getSelectedRoles():string[]  {
    this.selectedRoles = this.registrationForm.value.roleSelection.map((selected:any, i) => {
      if(selected){
        return this.roles[i].name;
      }else {
        return '';
      }
    });
    // return selected roles
    return this.selectedRoles.filter(function (element) {
      if (element !== '') {
        return element;
      }
    });
  }


}
