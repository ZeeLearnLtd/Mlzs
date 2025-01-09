import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseOpportunityComponent } from './franchise-opportunity.component';

describe('FranchiseOpportunityComponent', () => {
  let component: FranchiseOpportunityComponent;
  let fixture: ComponentFixture<FranchiseOpportunityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FranchiseOpportunityComponent]
    });
    fixture = TestBed.createComponent(FranchiseOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
