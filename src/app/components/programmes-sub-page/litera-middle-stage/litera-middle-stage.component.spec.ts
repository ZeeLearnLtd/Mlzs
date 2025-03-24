import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraMiddleStageComponent } from './litera-middle-stage.component';

describe('LiteraMiddleStageComponent', () => {
  let component: LiteraMiddleStageComponent;
  let fixture: ComponentFixture<LiteraMiddleStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiteraMiddleStageComponent]
    });
    fixture = TestBed.createComponent(LiteraMiddleStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
