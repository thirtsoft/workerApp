import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankPageComponent } from './blank-page.component';
import { BlankPageRoutingModule } from './blank-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BlankPageComponent],
  imports: [
    CommonModule,
    BlankPageRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class BlankPageModule { }
