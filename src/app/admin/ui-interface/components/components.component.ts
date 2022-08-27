import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/role';
import { Utilisateur } from 'src/app/models/utilisateur';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { RoleService } from 'src/app/services/role.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

  utilisateursList = [];
  rolesList = [];
  modalRef: BsModalRef;
  errorMessage: string;
  id:any;
  currentTime: number = 0;

  roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showGestionnaireBoard = false;
  showUserBoard = false;
  p : number=1;
  searchText;
  isActive = false;

  viewAccountForm: FormGroup;
  editStatusAccountForm: FormGroup;
  editForm: FormGroup;

  constructor(public userService: UtilisateurService,
              private toastr: ToastrService,
              private roleService: RoleService,
              private modalService: BsModalService,
              private tokenService: TokenStorageService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getListUtilisateurs();
    this.getListRoles();
    this.viewAccountForm = this.fb.group({
      id: [''],
      name: [''],
      addressRecruteur: [''],
      mobile: [''],
      email: [''],
      username: [''],
      photo: [''],
      nomEntreprise: [''],
      website: [''],
      secteurActivite: [''],
      information: [''],
      isActive: [''],
      dateInscription: [''],
    } );

    this.editStatusAccountForm = this.fb.group({
      id: [''],
      isActive: ['']
    } );
    this.editForm = this.fb.group({
      id: [''],
      name: [''],
      addressRecruteur: [''],
      mobile: [''],
      email: [''],
      username: [''],
      photo: [''],
      nomEntreprise: [''],
      website: [''],
      secteurActivite: [''],
      information: [''],
      roles: new FormControl(this.roles),
    });
  }

  getListUtilisateurs() {
    this.userService.getAllUtilisateursOrderByIdDesc().subscribe(
      (data: any[]) => {
        console.log(data);
        this.utilisateursList = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getListRoles() {
    this.userService.getALLUtilisateurs().subscribe(
      (data: any[]) => {
        this.utilisateursList = data;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getTS() {
    return this.currentTime;
  }

  viewUtilisateurModal(template: TemplateRef<any>, user: Utilisateur) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.viewAccountForm.patchValue( {
     id: user.id,
     name: user.name,
     addressRecruteur: user.addressRecruteur,
     mobile: user.mobile,
     email: user.email,
     username: user.username,
     photo: user.photo,
     nomEntreprise: user.nomEntreprise,
     website: user.website,
     secteurActivite: user.secteurActivite,
     information: user.information,
     active: user.isActive,
     dateInscription: user.dateInscription,
     roles: user.roles,
   });
  }

  editAccompteStatusModal(template: TemplateRef<any>, user: Utilisateur) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.editStatusAccountForm.patchValue( {
     id: user.id,
     isActive: user.isActive
    });
  }

  updateAccountStatus() {
    this.userService.activatedUser(this.editStatusAccountForm.value.id, this.editStatusAccountForm.value.isActive)
      .subscribe((data) => {
        this.modalRef.hide();
        this.toastr.success('avec succès','Status compte Modifié', {
          timeOut: 2500,
          positionClass: 'toast-top-right',
        });
       this.getListUtilisateurs();
      })
  }

  editUtilisateurModal(template: TemplateRef<any>, user: Utilisateur) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.editForm.patchValue( {
     id: user.id,
     name: user.name,
     addressRecruteur: user.addressRecruteur,
     mobile: user.mobile,
     email: user.email,
     username: user.username,
     photo: user.photo,
     nomEntreprise: user.nomEntreprise,
     website: user.website,
     secteurActivite: user.secteurActivite,
     information: user.information,
     isActive: user.isActive,
     dateInscription: user.dateInscription,
     roles: user.roles,
   });
  }

  compareRole(c1: Utilisateur, c2: Utilisateur): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  updateUtilisateur() {
    this.userService.updateUtilisateur(this.editForm.value.id, this.editForm.value)
      .subscribe((data) => {
        this.toastr.warning('avec succès','Information du compte Modifié', {
          timeOut: 2500,
          positionClass: 'toast-top-right',
        });
        this.modalRef.hide();
        this.getListUtilisateurs();
      });
  }

  deleteUtilisateurModal(template: TemplateRef<any>, prest) {
    this.id = prest.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteUtilisateur() {
    this.utilisateursList = this.utilisateursList.filter((a) => a.id !== this.id);
    this.userService.deleteUtilisateur(this.id).subscribe((data: any[]) => {
      this.toastr.error('avec succès','Utilisateur Supprimé', {
        timeOut: 2500,
        positionClass: 'toast-top-right',
      });
      this.modalRef.hide();
      this.getListUtilisateurs();
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
