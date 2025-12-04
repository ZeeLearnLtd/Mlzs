import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionforhyperlocalComponent } from './admissionforhyperlocal.component';

describe('AdmissionforhyperlocalComponent', () => {
  let component: AdmissionforhyperlocalComponent;
  let fixture: ComponentFixture<AdmissionforhyperlocalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmissionforhyperlocalComponent]
    });
    fixture = TestBed.createComponent(AdmissionforhyperlocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
