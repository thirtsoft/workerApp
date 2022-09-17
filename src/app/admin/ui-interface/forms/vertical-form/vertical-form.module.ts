import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalFormRoutingModule } from './vertical-form-routing.module';
import { NgSelect2Module } from 'ng-select2';
import { VerticalFormComponent } from './vertical-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VerticalFormComponent],
  imports: [
    CommonModule,
    VerticalFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module
  ]
})
export class VerticalFormModule { }
