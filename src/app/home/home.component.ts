import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CommonServiceService } from '../common-service.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { MetierService } from '../services/metier.service';
import { OuvrierService } from '../services/ouvrier.service';
import { Ouvrier } from '../models/ouvrier';
import { TokenStorageService } from '../services/auth/security/token-storage.service';
declare const $: any;

export interface Doctors {
  id: number;
  doctor_name: string;
  speciality: string;
  Education: string;
  location: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // encapsulation : ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild('slickModal1') slickModal1: SlickCarouselComponent;
  @ViewChild('slickModal2') slickModal2: SlickCarouselComponent;
  @ViewChild('slickModal3') slickModal3: SlickCarouselComponent;

  ouvriersList: any = [];
  metiersList: any = [];
  slidepage: any;
  employeeCtrl = new FormControl();
  ouvrierCtrl = new FormControl();
  metierCtrl = new FormControl();
  filteredEmployee: Observable<Doctors[]>;
  filteredOuvriers: Observable<Ouvrier[]>;
  filteredMetiers: Observable<Ouvrier[]>;
  blogs: any = [];
  keyword = 'name';
  searchDoctor = [];

  isLoggedIn: any;
  username: any;
  maxRatingValue = 5;
  currentRating = 4; 

  
  public countries = [
    {
      id: 1,
      name: 'Albania',
      img: 'image',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    },
  ];
  
  constructor(
    public router: Router,
    public ouvService: OuvrierService,
    public metService: MetierService,
    private tokenService: TokenStorageService
  ) {
    /*
    this.filteredEmployee = this.employeeCtrl.valueChanges.pipe(
      startWith(''),
      map((employee) =>
        employee ? this._filterEmployees(employee) : this.doctors.slice()
      )
    );*/

    this.filteredOuvriers = this.ouvrierCtrl.valueChanges.pipe(
      startWith(''),
      map((ouvrier) =>
        ouvrier ? this._filterOuvriers(ouvrier) : this.ouvriersList.slice()
      )
    );

  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getListOfMetiers();
    this.getListOfOuvriers();

    // User's voice slider
    $('.testi-slider').each(function () {

      var $show = $(this).data('show');
      var $arr = $(this).data('arrow');
      var $dots = !$arr;
      var $m_show = $show;
      if ($show == 3) $m_show = $show - 1;
      $(this).slick({
        slidesToShow: $show,
        slidesToScroll: 1,
        arrows: $arr,
        autoplay: false,
        autoplaySpeed: 6000,
        adaptiveHeight: true,
        prevArrow:
          '<button type="button" class="prev-nav"><i class="icon ion-ios-arrow-back"></i></button>',
        nextArrow:
          '<button type="button" class="next-nav"><i class="icon ion-ios-arrow-forward"></i></button>',
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: $m_show,
              slidesToScroll: 1,
              infinite: true,
              arrows: $arr,
              dots: $dots,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
        ],
      });
    });

    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.username = user.username;
    }
  }
  /*
  private _filterEmployees(value: string): Doctors[] {
    const filterValue = value.toLowerCase();
    return this.doctors.filter(
      (state) => state.doctor_name.toLowerCase().indexOf(filterValue) === 0
    );
  }
  */

  private _filterOuvriers(value: string): Ouvrier[] {
    const filterValue = value.toLowerCase();
    return this.ouvriersList.filter(
      (state) => state.ouvrier_name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  slide4 = [
    {
      img: 'assets/img/slide1.jpg',
    },
    {
      img: 'assets/img/slide2.jpg',
    }
  ]

  slides = [
    {
      img: 'assets/img/specialities/specialities-05.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Dentist',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-01.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Urology',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-02.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Neurology',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-03.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Orthopedic',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-04.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Cardiologist',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-05.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Dentist',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-01.png',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Urology',
      position: 'CEO of VoidCoders',
    },
  ];

  slideConfig4 = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slideConfig2 = {
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    speed: 500,
    variableWidth: true,
    arrows: false,
    autoplay: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slideConfig3 = {
    dots: true,
    arrows: false,
    variableWidth: true
  };

  next() {
    this.slickModal1.slickNext();
  }

  prev() {
    this.slickModal1.slickPrev();
  }

  getListOfMetiers() {
    this.metService.getMetiers().subscribe((res) => {
      this.metiersList = res;
    });
  }

  getListOfOuvriers() {
    this.ouvService.getAllOuvrierBySelectedIsTrue().subscribe((res) => {
      this.ouvriersList = res;
      console.log(this.ouvriersList);
      this.slidepage = {
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
      this.countries = [];
      /*
      this.doctors.forEach((index, i) => {
        this.countries.push({
          id: index.id,
          name: index.ouvrier_name,
        });
      });*/
    });
  }
/*
  getDoctors() {
    this.commonService.getDoctors().subscribe((res) => {
      this.doctors = res;
      this.slidepage = {
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
      this.countries = [];
      this.doctors.forEach((index, i) => {
        this.countries.push({
          id: index.id,
          name: index.doctor_name,
        });
      });
    });
  }
  */


  selectEvent(item) {
    let filter = this.countries.filter((a) => a.name === item.name);
    this.router.navigateByUrl('/patients/doctor-profile?id=' + filter[0].id);
    // do something with selected item
  }


  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }

  //// next step 2
  sliderContent = [
    {
      img: 'assets/img/features/feature-01.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Patient Ward',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/features/feature-02.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Test Room',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/features/feature-03.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'ICU',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/features/feature-04.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Laboratory',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/features/feature-05.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Operation',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/features/feature-06.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Medical',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/features/feature-05.jpg',
      msg:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Patient Ward',
      position: 'CEO of VoidCoders',
    },
  ];
  slideConfigure = {
    dots: false,
    autoplay: false,
    infinite: true,
    variableWidth: true,
  };
  nextslide() {
    this.slickModal2.slickNext();
  }

  prevslide() {
    this.slickModal2.slickPrev();
  }

  nextpage() {
    this.slickModal3.slickNext();
  }

  prevpage() {
    this.slickModal3.slickPrev();
  }
}
