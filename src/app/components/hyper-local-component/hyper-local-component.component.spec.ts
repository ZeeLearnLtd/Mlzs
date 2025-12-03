import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperLocalComponentComponent } from './hyper-local-component.component';

describe('HyperLocalComponentComponent', () => {
  let component: HyperLocalComponentComponent;
  let fixture: ComponentFixture<HyperLocalComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HyperLocalComponentComponent]
    });
    fixture = TestBed.createComponent(HyperLocalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
