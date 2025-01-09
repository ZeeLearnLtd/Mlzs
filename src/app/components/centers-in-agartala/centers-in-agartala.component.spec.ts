import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentersInAgartalaComponent } from './centers-in-agartala.component';

describe('CentersInAgartalaComponent', () => {
  let component: CentersInAgartalaComponent;
  let fixture: ComponentFixture<CentersInAgartalaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentersInAgartalaComponent]
    });
    fixture = TestBed.createComponent(CentersInAgartalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
