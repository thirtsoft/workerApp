import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbreAppointmentPeerMonthComponent } from './nbre-appointment-peer-month.component';

describe('NbreAppointmentPeerMonthComponent', () => {
  let component: NbreAppointmentPeerMonthComponent;
  let fixture: ComponentFixture<NbreAppointmentPeerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NbreAppointmentPeerMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NbreAppointmentPeerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
