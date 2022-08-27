import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizondalFormRoutingModule } from './horizondal-form-routing.module';
import { NgSelect2Module } from 'ng-select2';
import { HorizondalFormComponent } from './horizondal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HorizondalFormComponent],
  imports: [
    CommonModule,
    NgSelect2Module,
    HorizondalFormRoutingModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class HorizondalFormModule { }
