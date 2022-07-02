import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsComponent } from './reviews.component';


@NgModule({
  declarations: [ReviewsComponent],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    NgbModule
  ]
})
export class ReviewsModule { }
