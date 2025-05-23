import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverTestimonialsComponent } from './discover-testimonials.component';

describe('DiscoverTestimonialsComponent', () => {
  let component: DiscoverTestimonialsComponent;
  let fixture: ComponentFixture<DiscoverTestimonialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoverTestimonialsComponent]
    });
    fixture = TestBed.createComponent(DiscoverTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
