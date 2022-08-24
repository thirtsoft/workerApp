import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from './../../common-service.service';
import { ToastrService } from 'ngx-toastr';
import { OuvrierService } from 'src/app/services/ouvrier.service';
import { Rating } from 'src/app/models/rating';
import { RatingService } from 'src/app/services/rating.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MetierService } from 'src/app/services/metier.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Prestation } from 'src/app/models/prestation';
import { ServiceOffert } from 'src/app/models/service-offert';
import { PrestationService } from 'src/app/services/prestation.service';
import { ServiceOffertService } from 'src/app/services/service-offert.service';
import { AppointmentService } from 'src/app/services/appointment.service';

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
  prestationList: Prestation[];
  top8PrestationList: Prestation[];
  serviceOffertList: ServiceOffert[];
  numberOfAppointmentToOuvrier: any;
  numberOfPrestationOfOuvrier: any;

  numberOfRatingToOuvrier: any;
  currentRating: any = 4;
  starRating = 0;
  maxRatingValue: any = 5;
  isLoggedIn = false;
  username: string;
  addRatingForm: NgForm;
  formData: FormGroup;

  constructor(
    public commonService: CommonServiceService,
    public ouvService: OuvrierService,
    public ratService: RatingService,
    public metService: MetierService,
    private prestService: PrestationService,
    private servOffService: ServiceOffertService,
    public appointService: AppointmentService,
    public tokenService: TokenStorageService,
    private toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  get f() { return this.formData.controls; }

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
    this.infoForm();
    this.id = this.route.snapshot.queryParams['id'];
    this.getDoctorsDetails();
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.ratService.getUserId();
      this.username = user.username;
    }
    console.log('Param--', this.id);
    if(this.id  && this.id  > 0){
      this.getOuvrierDetails();
      this.getTop4ListPrestationOfOuvrierIdOrderByCreatedDateDesc();
      this.getTop8PrestationsOfOuvrierIdOrderByCreatedDateDesc();
      this.getAllServiceOffertsByOuvrierId();
    }
//    this.getOuvrierDetails();
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

  infoForm() {
    this.formData = this.fb.group({
      nbreEtoile: [this.currentRating, Validators.required],
      observation: ['', Validators.required],
    });
  }

  onRateChange(event :number) {
    console.log("The selected rate change ", event);
    this.currentRating = event;
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

  onAddRating() {
    console.log(this.formData.value);
    console.log(this.formData.value, this.id, this.ratService.id);
    this.ratService.addRatingToOuvrier(this.formData.value, this.id, this.ratService.id)
      .subscribe(
      (response: Rating) => {
        this.toastr.success('à ln\ouvrier','Note Attribué avec succès', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("/").then(() => {
        });
      
      },
      (error: HttpErrorResponse) => {
        this.toastr.error("Tous les champs doivent etre remplis")
      }

    );

  }

  getTop4ListPrestationOfOuvrierIdOrderByCreatedDateDesc() {
    this.prestService
      .getTop4PrestationByOuvrierIdOrderByCreatedDateDesc(this.id)
        .subscribe((response) => {
          this.prestationList = response;
          console.log(this.prestationList);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  getTop8PrestationsOfOuvrierIdOrderByCreatedDateDesc() {
    this.prestService
      .getTop8PrestationByOuvrierIdOrderByCreatedDateDesc(this.id)
        .subscribe((response) => {
          this.top8PrestationList = response;
          console.log(this.prestationList);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  getAllServiceOffertsByOuvrierId() {
    this.servOffService.getAllServiceOffertsByOuvrierId(this.id)
        .subscribe((response) => {
          this.serviceOffertList = response;
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
