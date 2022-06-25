import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from './../../common-service.service';
import { ToastrService } from 'ngx-toastr';
import { OuvrierService } from 'src/app/services/ouvrier.service';
import { Rating } from 'src/app/models/rating';
import { RatingService } from 'src/app/services/rating.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MetierService } from 'src/app/services/metier.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css'],
})
export class DoctorProfileComponent implements OnInit {
  id;
  doctorDetails;
  ouvrierDetails;

  ratingListDTOs: Rating[];
  numberOfRatingToOuvrier: any;
  currentRating: any = 4;
  starRating = 0;
  maxRatingValue: any = 5;

  constructor(
    public commonService: CommonServiceService,
    public ouvService: OuvrierService,
    public ratService: RatingService,
    public metService: MetierService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  images = [
    {
      path: 'assets/img/features/feature-01.jpg',
    },
    {
      path: 'assets/img/features/feature-02.jpg',
    },
    {
      path: 'assets/img/features/feature-03.jpg',
    },
    {
      path: 'assets/img/features/feature-04.jpg',
    },
  ];

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.id = this.route.snapshot.queryParams['id'];
    this.getDoctorsDetails();
    this.getOuvrierDetails();
    this.countNumberOfRatingToOuvrier();
    this.getListOfTop4RatingOrderByCreatedDateDescByOuvrierId();
  }

  getDoctorsDetails() {
    if (!this.id) {
      this.id = 1;
    }
    this.commonService.getDoctorDetails(this.id).subscribe((res) => {
      this.doctorDetails = res;
    });
  }

  getOuvrierDetails() {
    if (!this.id) {
      this.id = 1;
    }
    this.ouvService.getOuvrierById(this.id).subscribe((res) => {
      this.ouvrierDetails = res;
      console.log(this.ouvrierDetails);
    });
  }

  countNumberOfRatingToOuvrier() {
    this.ratService.countNumberOfRatingOfOuvriers(this.id)
      .subscribe((res) => {
        this.numberOfRatingToOuvrier = res;
    });
  }

  getListOfTop4RatingOrderByCreatedDateDescByOuvrierId() {
    this.ratService.getTop4RatingByOuvrierIdOrderByCreatedDateDesc(this.id)
      .subscribe((response) => {
        this.ratingListDTOs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addFav() {
    this.commonService.createFav(this.doctorDetails).subscribe((res) => {
      this.toastr.success('', 'Added to favourite successfully!');
      document.getElementById('fav-btn').style.background = '#fb1612';
      document.getElementById('fav-btn').style.color = '#fff';
    });
  }

  addFavOuvrier() {
    this.ouvService.createFav(this.ouvrierDetails).subscribe((res) => {
      this.toastr.success('', 'Added to favourite successfully!');
      document.getElementById('fav-btn').style.background = '#fb1612';
      document.getElementById('fav-btn').style.color = '#fff';
    });
  }
}
