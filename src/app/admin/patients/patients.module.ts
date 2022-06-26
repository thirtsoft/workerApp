import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';


@NgModule({
  declarations: [PatientsComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class PatientsModule { }
