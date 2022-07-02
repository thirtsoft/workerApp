import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UpdatePasswordInfo } from 'src/app/services/auth/models/profile-info';
import { AuthService } from 'src/app/services/auth/security/auth.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-doctor-change-password',
  templateUrl: './doctor-change-password.component.html',
  styleUrls: ['./doctor-change-password.component.css']
})
export class DoctorChangePasswordComponent implements OnInit {

  listDataProfil: Utilisateur = new Utilisateur();
  formDataProfile: UpdatePasswordInfo = new UpdatePasswordInfo();

  private roles!: string[];
  currentTime: number = 0;
  isLoggedIn = false;
  username!: string;
  email!: string;
  userId:any;
  customerName!: string;
  customerUsername!: string;
  customerEmail!: string;
  customerMobile!: string;
  customerPassword!: string;
  currentUser:any;
  id!: number;
  p:number=1;
  searchText:any;

  constructor(private tokenService: TokenStorageService,
    private crudApi: AuthService,
    public toastr: ToastrService,
    public userService: UtilisateurService,
    public fb: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.userId = user.id;
    }
    this.getUtilisateurById();
  }

  getUtilisateurById() {
    this.userService.getUtilisateurById(this.userId).subscribe(
      (response: Utilisateur) => {
        this.listDataProfil = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  update() {
    this.crudApi.updatePassword(this.formDataProfile).subscribe(
      (response) => {
        this.toastr.success('veuillez vous reconnectez','Votre Mot de passe a ete modifie avec success', {
          timeOut: 1800,
          positionClass: 'toast-top-right',
        });
        this.logout();
        this.router.navigateByUrl("home").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } 

  logout(){
    this.tokenService.signOut();
  }
}
