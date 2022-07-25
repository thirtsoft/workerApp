import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { HistoriqueLoginService } from 'src/app/services/historique-login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-data-table',
  templateUrl: './admin-data-table.component.html',
  styleUrls: ['./admin-data-table.component.css']
})
export class AdminDataTableComponent implements OnInit {

  historiqueLoginsList: any = [];
  
  constructor(public log: HistoriqueLoginService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListHistoriqueLogins();
  }

  getListHistoriqueLogins() {
    this.log.getHistoriqueLoginsOrderByIdDesc()
    .subscribe(res=>{
      this.historiqueLoginsList = res;
    })
  }

  onDeleteHistoriqueLogin(id: number): void{
    if (window.confirm('Etes-vous sure de vouloir supprimer cette HistoriqueLogin ?')) {
      this.log.deleteHistoriqueLogin(id).subscribe(data => {
        this.toastr.error('avec succès','HistoriqueLogin supprimée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.getListHistoriqueLogins();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

  }


/*
  datatable: any;
  constructor() { }

  ngOnInit(): void {
    const table: any = $('table');
    this.datatable = table.DataTable();
  }
  */

}
