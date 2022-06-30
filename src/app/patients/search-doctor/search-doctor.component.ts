import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonServiceService } from './../../common-service.service'
import { FormsModule } from '@angular/forms';
import { MetierService } from 'src/app/services/metier.service';
import { OuvrierService } from 'src/app/services/ouvrier.service';


@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.component.html',
  styleUrls: ['./search-doctor.component.css']
})
export class SearchDoctorComponent implements OnInit {
  doctors: any = [];
  specialityList: any = [];
  metierList: any = [];
  ouvrierList: any = [];
  type;
  specialist = "";
  listMetier = "";
  speciality;
  metier;
  selDate;

  size: number = 9;
  currentPage: number = 1;
  totalPages!: number;
  pages!: Array<number>;

  currentTime: number = 0;
  currentMetierId!: number;
  previousMetierId: number = 1;

  searchMode: boolean = false;
  priceSearch!: number;
  starRating = 0;
  currentRating = 4;
  page: number = 1;
  pageLength: number = 12;
  ouvrierSize: number = 0;

  constructor(
          public commonService: CommonServiceService,
          public metService: MetierService,
          public ouvService: OuvrierService,
          public router: Router,
          private route: ActivatedRoute) { }
  
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
    this.getDoctors();
    this.getspeciality();
    this.getAllMetiers();
    this.route.paramMap.subscribe(()=> {
      this.finishOuvriers();
    });
  //  this.finishOuvriers();
  }

  finishOuvriers(){
    let result1 = this.route.snapshot.paramMap.has('id');
    let result2 = this.route.snapshot.paramMap.has('disponibility');
    if(result1){
      this.getOuvrierByMetierId();
    } else if (result2) {
      this.getAllOuvriersContainingKey();
    } else {
      this.getOuvriers();
    }
  }

  getOuvriers() {
    this.ouvService.getOuvriersLength().subscribe(
      data => {
        this.ouvrierSize = data
      }
    )
    this.ouvService.getAllOuvriersByPageables(this.page-1,this.pageLength).subscribe(
      data => {
        this.ouvrierList = data;
        console.log(this.ouvrierList);
      }
    )
  }

  getOuvrierByMetierId(){
    let idMetier = this.route.snapshot.paramMap.get('id');
    this.ouvService.getOuvriersLengthByMetierId(idMetier).subscribe(
      data => {
        this.ouvrierSize = data
      }
    )
    this.ouvService.getAllOuvriersByMetierIdByPageable(idMetier,this.page-1,this.pageLength).subscribe(
      data => {
        this.ouvrierList = data;
      }
    )
  }

  getAllOuvriersContainingKey(){
    let disponibility = this.route.snapshot.paramMap.get('disponibility');
  //  let disponibility = this.route.snapshot.paramMap.get('id');
    this.ouvService.getOuvriersLengthByKey(disponibility).subscribe(
      data => {
        this.ouvrierSize = data
      }
    )
    this.ouvService.getOuvriersByKey(disponibility,this.page-1,this.pageLength).subscribe(
      data => {
        this.ouvrierList = data;
        console.log(this.ouvrierList);
      }
    )
  }

  doing() {
    this.finishOuvriers()
  }

  pageSize(event: Event) {
    this.pageLength = +(<HTMLInputElement>event.target).value
    this.finishOuvriers()
  }

  getAllMetiers() {
    this.metService.getMetiers().subscribe(res => {
      this.metierList = res;
    })
  }

  getAllOuvriers() {
    this.ouvService.getAllOuvrierBySelectedIsTrue().subscribe(res => {
      this.ouvrierList = res;
    })
  }

  getAllOuvriersByDisponibilities() {
    this.ouvService.getAllOuvrierBySelectedIsTrue().subscribe(res => {
      this.ouvrierList = res;
    })
  }

  getDoctors() {
    this.commonService.getSearchDoctors().subscribe(res => {
      this.doctors = res;
    })
  }

  getspeciality() {
    this.commonService.getSpeciality().subscribe(res => {
      this.specialityList = res;
    })
  }

  checkType(event) {
    if (event.target.checked) {
      this.type = event.target.value;
    } else {
      this.type = "";
    }
  }

  search() {
    if (this.type && this.speciality) {
      this.doctors = this.doctors.filter(a => a.type === this.type && a.speciality === this.speciality)
    } else {
      this.getDoctors();
    }
  }

  checkSpeciality(event) {
    if (event.target.checked) {
      this.speciality = event.target.value;
    } else {
      this.speciality = "";
    }

    var filter = this.specialityList.filter(a => a.speciality === event.target.value);
    if (filter.length != 0) {
      filter[0]['checked'] = true;
    }
    this.specialityList.forEach(index => {
      if (index.speciality != event.target.value) {
        index['checked'] = false;
      }
    })
  }

  bookAppointment(id) {
    // if((localStorage.getItem('auth') === 'true') && (localStorage.getItem('patient') === 'true')) {
    this.router.navigateByUrl('/patients/booking?id=' + id);
    // } else {
    //   this.router.navigate(['/']);
    // }
  }

}
