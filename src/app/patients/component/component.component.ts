import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { OuvrierService } from 'src/app/services/ouvrier.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {

  doctors: any = [];
  specialityList: any = [];
  addressList: any = [];
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
  isLoggedIn: any;
  username: any;
  maxRatingValue = 5;
  page: number = 1;
  pageLength: number = 12;
  ouvrierSize: number = 0;
  numberOfRatingToOuvrier: any;
  id;

  constructor(
          public addService: AddressService,
          public ouvService: OuvrierService,
          private ratService: RatingService,
          private tokenService: TokenStorageService,
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
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.username = user.username;
    }
    this.getAllAddress();
    this.route.paramMap.subscribe(()=> {
      this.finishOuvriers();
      this.countNumberOfRatingToOuvrier();
    });
  }

  finishOuvriers(){
    let result1 = this.route.snapshot.paramMap.has('id');
    if(result1){
      this.getOuvrierByAddressId();      
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
      }
    )
  }

  getOuvrierByAddressId(){
    let idAddress = this.route.snapshot.paramMap.get('id');
    this.ouvService.getOuvriersLengthByAddressId(idAddress).subscribe(
      data => {
        this.ouvrierSize = data
      }
    )
    this.ouvService.getAllOuvriersByLocalityIdByPageable(idAddress,this.page-1,this.pageLength).subscribe(
      data => {
        this.ouvrierList = data;
      }
    )
  }

  countNumberOfRatingToOuvrier() {
    this.id = this.route.snapshot.paramMap.get('id');
    for (let i=0; i<this.ouvrierList.length; i++) {
      this.ratService.countNumberOfRatingOfOuvriers(this.ouvrierList[i].id)
        .subscribe((res) => {
          this.numberOfRatingToOuvrier = res;
      });
    }
  }

  doing() {
    this.finishOuvriers()
  }

  pageSize(event: Event) {
    this.pageLength = +(<HTMLInputElement>event.target).value
    this.finishOuvriers()
  }

  getAllAddress() {
    this.addService.getAllAddresss().subscribe(res => {
      this.addressList = res;
    })
  }

  getAllOuvriers() {
    this.ouvService.getAllOuvrierBySelectedIsTrue().subscribe(res => {
      this.ouvrierList = res;
    })
  }

  checkType(event) {
    if (event.target.checked) {
      this.type = event.target.value;
    } else {
      this.type = "";
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

