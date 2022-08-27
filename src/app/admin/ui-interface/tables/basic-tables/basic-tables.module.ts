import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicTablesRoutingModule } from './basic-tables-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { BasicTablesComponent } from './basic-tables.component';




@NgModule({
  declarations: [
    BasicTablesComponent
  ],
  imports: [
    CommonModule,
    BasicTablesRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BasicTablesModule { }
