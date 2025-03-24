import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsAndRecognitionsComponent } from './awards-and-recognitions.component';

describe('AwardsAndRecognitionsComponent', () => {
  let component: AwardsAndRecognitionsComponent;
  let fixture: ComponentFixture<AwardsAndRecognitionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwardsAndRecognitionsComponent]
    });
    fixture = TestBed.createComponent(AwardsAndRecognitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
