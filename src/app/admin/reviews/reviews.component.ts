import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import { RatingService } from 'src/app/services/rating.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: any = [];
  ratingsList: any = [];
  errorMessage: string;
  modalRef: BsModalRef;
  id;
  p: number=1;
  searchText: any;
  maxRatingValue = 5;


  constructor(public commonService: CommonServiceService,
              public crudApi: RatingService,
              public router: Router,
              public toastr: ToastrService,
              private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getReviews();
    this.getReviewsList();
  }

  deleteModal(template: TemplateRef<any>, special) {
    let data = this.reviews.filter(a => a.id === special.id);
    this.id = data[0].id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
  }

  deleteReviewModal(template: TemplateRef<any>, review) {
    let data = this.ratingsList.filter(a => a.id === review.id);
    this.id = data[0].id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
  }

  getReviews() {
    this.commonService.getReviews()
      .subscribe(res => {
        this.reviews = res;
        $(function () {
          $("table").DataTable();
        });
      },
        error => this.errorMessage = <any>error);
  }

  getReviewsList() {
    this.crudApi.getAllRatingOrderByIdDesc()
      .subscribe(res => {
        this.ratingsList = res;
        $(function () {
          $("table").DataTable();
        });
      },
        error => this.errorMessage = <any>error);
  }

  deleteReview() {
    this.commonService.deleteReview(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getReviews();
    });
  }

  deleteRating() {
    this.crudApi.deleteRating(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getReviewsList();
    });
  }

  decline() {
    this.modalRef.hide();
  }

  btnColor() {
    document.getElementById('btn-yes').style.backgroundColor = "#00d0f1";
    document.getElementById('btn-yes').style.border = "1px solid #00d0f1";
    document.getElementById('btn-yes').style.color = "#fff";

    document.getElementById('btn-no').style.backgroundColor = "#fff";
    document.getElementById('btn-no').style.border = "1px solid #fff";
    document.getElementById('btn-no').style.color = "#000";
  }

  btnColorNo() {
    document.getElementById('btn-no').style.backgroundColor = "#00d0f1";
    document.getElementById('btn-no').style.border = "1px solid #00d0f1";
    document.getElementById('btn-no').style.color = "#fff";

    document.getElementById('btn-yes').style.backgroundColor = "#fff";
    document.getElementById('btn-yes').style.border = "1px solid #fff";
    document.getElementById('btn-yes').style.color = "#000";
  }

}
