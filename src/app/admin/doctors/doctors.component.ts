import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import * as $ from 'jquery';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  doctorsList: any = [];
  errorMessage: string;
  internauteList = [];

  id!: number;
  p : number=1;
  searchText: any;
  roles!: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showGestionnaireBoard = false;
  showUserBoard = false;

  username!: string;
  email!: String;
  userId: any;
  currentTime: number = 0;

  constructor(public commonService: CommonServiceService,
              public crudApi: UtilisateurService,
              private tokenService: TokenStorageService,
              public toastr: ToastrService,
    //          private fb: FormBuilder
              ) {}

  ngOnInit(): void {
 //   this.getDoctors();
    this.getInternautesList();
  }

  getDoctors() {
    this.commonService.getDoctors().subscribe(
      (res) => {
        this.doctorsList = res;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getInternautesList() {
    this.crudApi.getAllUtilisateursOrderByIdDesc().subscribe(
      (data: any[]) => {
        this.internauteList = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getTS() {
    return this.currentTime;
  }
}
