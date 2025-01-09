import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsCornerComponent } from './parents-corner.component';

describe('ParentsCornerComponent', () => {
  let component: ParentsCornerComponent;
  let fixture: ComponentFixture<ParentsCornerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentsCornerComponent]
    });
    fixture = TestBed.createComponent(ParentsCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
