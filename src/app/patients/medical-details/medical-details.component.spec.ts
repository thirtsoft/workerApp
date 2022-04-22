import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalDetailsComponent } from './medical-details.component';

describe('MedicalDetailsComponent', () => {
  let component: MedicalDetailsComponent;
  let fixture: ComponentFixture<MedicalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
