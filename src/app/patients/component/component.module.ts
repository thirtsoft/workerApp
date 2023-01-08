import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentComponent } from './component.component';
import { ComponentRoutingModule } from './component-routing.module';
import { NgSelect2Module } from 'ng-select2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ ComponentComponent],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    NgSelect2Module,
    NgbModule,
  ]
})
export class ComponentModule { }
