import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsDetailsComponent } from './testimonials-details.component';

describe('TestimonialsDetailsComponent', () => {
  let component: TestimonialsDetailsComponent;
  let fixture: ComponentFixture<TestimonialsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonialsDetailsComponent]
    });
    fixture = TestBed.createComponent(TestimonialsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
