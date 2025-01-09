import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegancyComponent } from './legancy.component';

describe('LegancyComponent', () => {
  let component: LegancyComponent;
  let fixture: ComponentFixture<LegancyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegancyComponent]
    });
    fixture = TestBed.createComponent(LegancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
