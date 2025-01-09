import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreschoolInAgartalaComponent } from './preschool-in-city.component';

describe('PreschoolInAgartalaComponent', () => {
  let component: PreschoolInAgartalaComponent;
  let fixture: ComponentFixture<PreschoolInAgartalaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreschoolInAgartalaComponent]
    });
    fixture = TestBed.createComponent(PreschoolInAgartalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
