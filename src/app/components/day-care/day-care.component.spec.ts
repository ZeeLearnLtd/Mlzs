import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayCareComponent } from './day-care.component';

describe('DayCareComponent', () => {
  let component: DayCareComponent;
  let fixture: ComponentFixture<DayCareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayCareComponent]
    });
    fixture = TestBed.createComponent(DayCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
