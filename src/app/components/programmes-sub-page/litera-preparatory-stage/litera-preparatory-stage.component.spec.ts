import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraPreparatoryStageComponent } from './litera-preparatory-stage.component';

describe('LiteraPreparatoryStageComponent', () => {
  let component: LiteraPreparatoryStageComponent;
  let fixture: ComponentFixture<LiteraPreparatoryStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiteraPreparatoryStageComponent]
    });
    fixture = TestBed.createComponent(LiteraPreparatoryStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
