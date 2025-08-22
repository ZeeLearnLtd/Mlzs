import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertToMLZSComponent } from './convert-to-mlzs.component';

describe('ConvertToMLZSComponent', () => {
  let component: ConvertToMLZSComponent;
  let fixture: ComponentFixture<ConvertToMLZSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertToMLZSComponent]
    });
    fixture = TestBed.createComponent(ConvertToMLZSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
