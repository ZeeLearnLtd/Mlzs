import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsAndRecognitionComponent } from './awards-and-recognition.component';

describe('AwardsAndRecognitionComponent', () => {
  let component: AwardsAndRecognitionComponent;
  let fixture: ComponentFixture<AwardsAndRecognitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwardsAndRecognitionComponent]
    });
    fixture = TestBed.createComponent(AwardsAndRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
