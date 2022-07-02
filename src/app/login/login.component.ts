import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from '../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../services/auth/security/token-storage.service';
import { Login } from '../services/auth/models/login';
import { AuthService } from '../services/auth/security/auth.service';

declare const $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isPatient: boolean = false;
  doctors: any = [];
  patients: any = [];
  username = '';
  password = '';

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginInfo: Login;

  constructor(
    public router: Router,
    public commonService: CommonServiceService,
    public authService: AuthService,
    public tokenStorage: TokenStorageService,
    private toastr: ToastrService
  ) {
    this.username = '';
    this.password = '';
    this.doctors = [];
    this.patients = [];
  }

  ngOnInit(): void {
    this.getpatients();
    this.getDoctors();
    	// Floating Label
    if($('.floating').length > 0 ){
        $('.floating').on('focus blur', function (e) {
		    $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
        }).trigger('blur');
	  }

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

  }

  checkType(event) {
    this.isPatient = event.target.checked ? true : false;
  }

  /*
  login(name, password) {
    localStorage.setItem('auth', 'true');
    localStorage.setItem('patient', this.isPatient.toString());
    if (this.isPatient) {
      let filter = this.patients.filter(
        (a) => a.name == this.username && a.password === this.password
      );
      if (filter.length != 0) {
        localStorage.setItem('id', filter[0]['id']);
        this.toastr.success('', 'Login success!');
        this.commonService.nextmessage('patientLogin');
        this.router.navigate(['/patients/dashboard']);
      } else {
        this.toastr.error('', 'Login failed!');
      }
    } else {
      let filter = this.doctors.filter(
        (a) => a.doctor_name === this.username && a.password === this.password
      );
      if (filter.length != 0) {
        this.toastr.success('', 'Login success!');
        this.commonService.nextmessage('doctorLogin');
        localStorage.setItem('id', filter[0]['id']);
        this.router.navigate(['/doctor/dashboard']);
      } else {
        this.toastr.error('', 'Login failed!');
      }
    }
  }
  */

  onSubmit() {
    this.loginInfo = new Login(
      this.form.username,
      this.form.password,
    );
    console.log(this.loginInfo);
    this.authService.attemptAuth(this.loginInfo).subscribe(data => {
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUser(data);
      this.tokenStorage.saveUsername(data.username);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      console.log("Login Success");
      this.toastr.success('bien connecté','Vous etes', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("home").then(() => {
          window.location.reload();
        });
      },
      error => {
        this.toastr.error('veuillez vérifier vos identifiants','Error de connection', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
          });
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
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
