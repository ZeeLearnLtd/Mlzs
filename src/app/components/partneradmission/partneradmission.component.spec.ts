import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartneradmissionComponent } from './partneradmission.component';

describe('PartneradmissionComponent', () => {
  let component: PartneradmissionComponent;
  let fixture: ComponentFixture<PartneradmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartneradmissionComponent]
    });
    fixture = TestBed.createComponent(PartneradmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
