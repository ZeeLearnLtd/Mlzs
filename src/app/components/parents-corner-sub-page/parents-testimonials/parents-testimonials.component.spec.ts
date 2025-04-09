import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsTestimonialsComponent } from './parents-testimonials.component';

describe('ParentsTestimonialsComponent', () => {
  let component: ParentsTestimonialsComponent;
  let fixture: ComponentFixture<ParentsTestimonialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentsTestimonialsComponent]
    });
    fixture = TestBed.createComponent(ParentsTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
