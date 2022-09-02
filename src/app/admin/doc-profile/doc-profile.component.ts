import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/models/utilisateur';
import { ProfileInfo, UpdatePasswordInfo } from 'src/app/services/auth/models/profile-info';
import { AuthService } from 'src/app/services/auth/security/auth.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-doc-profile',
  templateUrl: './doc-profile.component.html',
  styleUrls: ['./doc-profile.component.css'],
})
export class DocProfileComponent implements OnInit {

  name = '';
  username = '';
  password = '';
  
  profileInfo: ProfileInfo = {} as ProfileInfo;
  email;

  editPhoto: boolean;
  currentProfile: any;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  title: string;
  currentRequest: string;
  currentTime: number = 0;
  id;
  listDataProfil: any;
  formDataProfile: UpdatePasswordInfo  = new UpdatePasswordInfo();

  userId;
  img: boolean;
  changePass = false;
  personalDetails = true;

  constructor(private authService: AuthService,
              private tokenService: TokenStorageService,
              public toastr: ToastrService,
              public userService: UtilisateurService,
              public fb: FormBuilder, 
              private router: Router,
              private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.getEmploye();
    const user = this.tokenService.getUser();
    this.id = user.id
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
    if (this.userService.getUserAvatar(this.userId) === null)
      this.img = false;
    else this.img =true;

  }

  getEmploye() {
    const user = this.tokenService.getUser();
    this.userService.getUtilisateurById(user.id).subscribe(
      response => {
        this.listDataProfil = response;
      }
    );
  }

  getTS() {
    return this.currentTime;
  }

  onEditPhoto(p) {
    this.currentProfile = p;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  processForm() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.userService.uploadPhotoUtilisateur(this.currentFileUpload, this.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.currentTime = Date.now();
        }
      }, err => {
        this.toastr.warning("Problème de chargment de la photo");
      }
      );
    this.selectedFiles = undefined;
  }

  update() {
    console.log('Data send--', this.listDataProfil);
    this.userService.updateUtilisateur(this.listDataProfil.id, this.listDataProfil).subscribe(
      (response: Utilisateur) => {
        this.toastr.warning('avec succès','Informations Modifiée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("profile/" + this.userId).then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } 

  updatePassword() {
    this.authService.updatePassword(this.formDataProfile).
    subscribe((data:any) => {
      this.toastr.warning('veuillez vous reconnectez','Votre Mot de pqsse a ete modifie avec success', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.logout();
    });

  }


  logout(): void {
    this.tokenService.signOut();
    this.router.navigateByUrl("admin/login-form").then(() => {
      window.location.reload();
    });
  }

  about() {
    this.changePass = false;
    this.personalDetails = true;
    document.getElementById('about').classList.add('active');
    document.getElementById('pass').classList.remove('active');
  }
  pass() {
    this.changePass = true;
    this.personalDetails = false;
    document.getElementById('about').classList.remove('active');
    document.getElementById('pass').classList.add('active');
  }

  submit() {
    this.router.navigateByUrl('/admin/doc-profile');
  }
}
