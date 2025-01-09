import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PentemindComponent } from './pentemind.component';

describe('PentemindComponent', () => {
  let component: PentemindComponent;
  let fixture: ComponentFixture<PentemindComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PentemindComponent]
    });
    fixture = TestBed.createComponent(PentemindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
