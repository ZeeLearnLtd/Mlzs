import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurParentsComponent } from './our-parents.component';

describe('OurParentsComponent', () => {
  let component: OurParentsComponent;
  let fixture: ComponentFixture<OurParentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurParentsComponent]
    });
    fixture = TestBed.createComponent(OurParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
