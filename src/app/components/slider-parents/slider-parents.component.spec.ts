import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderParentsComponent } from './slider-parents.component';

describe('SliderParentsComponent', () => {
  let component: SliderParentsComponent;
  let fixture: ComponentFixture<SliderParentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderParentsComponent]
    });
    fixture = TestBed.createComponent(SliderParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
