import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicsBeyondComponent } from './academics-beyond.component';

describe('AcademicsBeyondComponent', () => {
  let component: AcademicsBeyondComponent;
  let fixture: ComponentFixture<AcademicsBeyondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicsBeyondComponent]
    });
    fixture = TestBed.createComponent(AcademicsBeyondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
