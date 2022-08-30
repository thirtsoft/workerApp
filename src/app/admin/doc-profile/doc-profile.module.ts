import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocProfileComponent } from './doc-profile.component';
import { DocProfileRoutingModule } from './doc-profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ DocProfileComponent ],
  imports: [
    CommonModule,
    DocProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DocProfileModule { }
