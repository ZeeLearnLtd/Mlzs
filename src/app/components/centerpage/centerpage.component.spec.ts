import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterpageComponent } from './centerpage.component';

describe('CenterpageComponent', () => {
  let component: CenterpageComponent;
  let fixture: ComponentFixture<CenterpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CenterpageComponent]
    });
    fixture = TestBed.createComponent(CenterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
