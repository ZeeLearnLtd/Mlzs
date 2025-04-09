import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraExpComponent } from './litera-exp.component';

describe('LiteraExpComponent', () => {
  let component: LiteraExpComponent;
  let fixture: ComponentFixture<LiteraExpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiteraExpComponent]
    });
    fixture = TestBed.createComponent(LiteraExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
