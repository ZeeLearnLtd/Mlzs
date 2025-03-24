import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraSecondaryStageComponent } from './litera-secondary-stage.component';

describe('LiteraSecondaryStageComponent', () => {
  let component: LiteraSecondaryStageComponent;
  let fixture: ComponentFixture<LiteraSecondaryStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiteraSecondaryStageComponent]
    });
    fixture = TestBed.createComponent(LiteraSecondaryStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
