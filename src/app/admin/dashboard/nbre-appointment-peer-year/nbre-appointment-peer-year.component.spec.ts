import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbreAppointmentPeerYearComponent } from './nbre-appointment-peer-year.component';

describe('NbreAppointmentPeerYearComponent', () => {
  let component: NbreAppointmentPeerYearComponent;
  let fixture: ComponentFixture<NbreAppointmentPeerYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NbreAppointmentPeerYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NbreAppointmentPeerYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
