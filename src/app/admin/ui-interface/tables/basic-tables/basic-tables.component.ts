import { Component, OnInit } from '@angular/core';
import { HistoriqueLoginService } from 'src/app/services/historique-login.service';

@Component({
  selector: 'app-basic-tables',
  templateUrl: './basic-tables.component.html',
  styleUrls: ['./basic-tables.component.css']
})
export class BasicTablesComponent implements OnInit {

  historiqueLoginsList: any = [];
  
  constructor(public log: HistoriqueLoginService) { }

  ngOnInit(): void {
    this.getListHistoriqueLogins();
  }

  getListHistoriqueLogins() {
    this.log.getHistoriqueLoginsOrderByIdDesc()
    .subscribe(res=>{
      this.historiqueLoginsList = res;
    })
  }


}
