import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseThankyouComponent } from './franchise-thankyou.component';

describe('FranchiseThankyouComponent', () => {
  let component: FranchiseThankyouComponent;
  let fixture: ComponentFixture<FranchiseThankyouComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FranchiseThankyouComponent]
    });
    fixture = TestBed.createComponent(FranchiseThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
