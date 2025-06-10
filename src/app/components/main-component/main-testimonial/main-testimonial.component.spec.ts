import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTestimonialComponent } from './main-testimonial.component';

describe('MainTestimonialComponent', () => {
  let component: MainTestimonialComponent;
  let fixture: ComponentFixture<MainTestimonialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainTestimonialComponent]
    });
    fixture = TestBed.createComponent(MainTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
