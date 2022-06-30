import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsComponent } from './reviews.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ReviewsComponent],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DataTablesModule
  ]
})
export class ReviewsModule { }
