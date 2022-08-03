import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/models/appointment';
import { Prestation } from 'src/app/models/prestation';
import { ServiceOffert } from 'src/app/models/service-offert';
import { AppointmentService } from 'src/app/services/appointment.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { MetierService } from 'src/app/services/metier.service';
import { OuvrierService } from 'src/app/services/ouvrier.service';
import { PrestationService } from 'src/app/services/prestation.service';
import { ServiceOffertService } from 'src/app/services/service-offert.service';
import { CommonServiceService } from './../../common-service.service';
declare const $: any;
declare var moment: any;
declare var daterangepicker: any;
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  doctorId;
  doctorDetails;
  userDetails;
  public daterange: any = {};

  id;
  doctorsDetails;
  ouvrierDetails;

  appointList: Appointment[];
  prestationList: Prestation[];
  top8PrestationList: Prestation[];
  serviceOffertList: ServiceOffert[];
  numberOfAppointmentToOuvrier: any;
  numberOfPrestationOfOuvrier: any;
  currentRating: any = 4;
  starRating = 0;
  maxRatingValue: any = 5;
  isLoggedIn = false;
  username: string;
  addAppointmentForm: NgForm;
  formData: FormGroup;

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
  };

  public selectedDate(value: any, datepicker?: any) {
    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // use passed valuable to update state
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

  constructor(
    private route: ActivatedRoute,
    public commonService: CommonServiceService,
    public ouvService: OuvrierService, 
    public appointService: AppointmentService,
    public metService: MetierService,
    public tokenService: TokenStorageService,
    private toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
    private prestService: PrestationService,
    private servOffService: ServiceOffertService
  ) {}

  get f() { return this.formData.controls; }

  ngOnInit(): void {
    if($('.bookingrange').length > 0) {
      var start = moment().subtract(6, 'days');
      var end = moment();
      
      function booking_range(start, end) {
        $('.bookingrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      }
      $('.bookingrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
      }, booking_range
      );
      booking_range(start, end);
    }
    if (this.route.snapshot.queryParams['id']) {
      this.doctorId = this.route.snapshot.queryParams['id'];
    } else {
      this.doctorId = 1;
    }
    this.getDoctorsDetails();
    this.patientDetails();
    
    this.infoForm();
    this.id = this.route.snapshot.queryParams['id'];
    this.getDoctorsDetails();
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.appointService.getUserId();
      this.username = user.username;
    }
    console.log('Param--', this.id);
    if(this.id  && this.id  > 0){
      this.getOuvrierDetails();
      this.getTop4ListPrestationOfOuvrierIdOrderByCreatedDateDesc();
      this.getAllServiceOffertsByOuvrierId();
      this.getTop8PrestationsOfOuvrierIdOrderByCreatedDateDesc();
    }
    this.countNumberOfAppointmentToOuvrier();
    this.countNumberOfPrestationToOuvrier();

  }

  getDoctorsDetails() {
    this.commonService.getDoctorDetails(this.doctorId).subscribe((res) => {
      this.doctorDetails = res;
    });
  }

  patientDetails() {
    let userId;
    userId = localStorage.getItem('id');
    if (!userId) {
      userId = 1;
    }
    this.commonService.getPatientDetails(Number(userId)).subscribe((res) => {
      this.userDetails = res;
    });
  }

  infoForm() {
    this.formData = this.fb.group({
      appointmentDate: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', Validators.required],
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

  countNumberOfAppointmentToOuvrier() {
    this.appointService.countNumberOfAppointmentByOuvrierId(this.id)
      .subscribe((res) => {
        this.numberOfAppointmentToOuvrier = res;
    });
  }

  countNumberOfPrestationToOuvrier() {
    this.prestService.countNumberOfPrestationByOuvrierId(this.id)
      .subscribe((res) => {
        this.numberOfPrestationOfOuvrier = res;
    });
  }

  getListOfTopAppointmentOrderByCreatedDateDescByOuvrierId() {
    this.appointService.getTop4AppointmentByOuvrierIdOrderByCreatedDateDesc(this.id)
      .subscribe((response) => {
        this.appointList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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

  onAddAppointment() {
    console.log(this.formData.value);
    console.log(this.formData.value, this.id, this.appointService.id);
    this.appointService.addAppointmentToOuvrier(this.formData.value, this.id, this.appointService.id)
      .subscribe(
      (response: Appointment) => {
        this.toastr.success('à ln\ouvrier','Demande envoyée avec succès', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("home").then(() => {
        });
      
      },
      (error: HttpErrorResponse) => {
        this.toastr.error("Tous les champs doivent etre remplis")
      }

    );

  }

}
