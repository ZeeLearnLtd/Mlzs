import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionThankyouComponent } from './admission-thankyou.component';

describe('AdmissionThankyouComponent', () => {
  let component: AdmissionThankyouComponent;
  let fixture: ComponentFixture<AdmissionThankyouComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmissionThankyouComponent]
    });
    fixture = TestBed.createComponent(AdmissionThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
