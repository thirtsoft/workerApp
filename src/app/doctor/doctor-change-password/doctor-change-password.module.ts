import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorChangePasswordRoutingModule } from './doctor-change-password-routing.module';
import { DoctorChangePasswordComponent } from './doctor-change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DoctorChangePasswordComponent],
  imports: [
    CommonModule,
    DoctorChangePasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DoctorChangePasswordModule { }
