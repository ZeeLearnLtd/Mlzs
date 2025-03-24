import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPedagogyComponent } from './our-pedagogy.component';

describe('OurPedagogyComponent', () => {
  let component: OurPedagogyComponent;
  let fixture: ComponentFixture<OurPedagogyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurPedagogyComponent]
    });
    fixture = TestBed.createComponent(OurPedagogyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
