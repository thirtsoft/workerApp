import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ForgotPasswordModule } from './../../forgot-password/forgot-password.module';
// import { MorrisJsModule } from 'angular-morris-js';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NbreAppointmentPeerMonthComponent } from './nbre-appointment-peer-month/nbre-appointment-peer-month.component';
import { NbreAppointmentPeerYearComponent } from './nbre-appointment-peer-year/nbre-appointment-peer-year.component';

@NgModule({
  declarations: [DashboardComponent, NbreAppointmentPeerMonthComponent, NbreAppointmentPeerYearComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ForgotPasswordModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbModule,
    DataTablesModule
    // MorrisJsModule,
  ],
})
export class DashboardModule {}
