import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankComponent } from './blank.component';
import { BlankRoutingModule } from './blank-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BlankComponent],
  imports: [CommonModule, BlankRoutingModule, ReactiveFormsModule],
})
export class BlankModule {}
