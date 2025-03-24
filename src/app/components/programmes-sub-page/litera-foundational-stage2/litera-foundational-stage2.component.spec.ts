import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraFoundationalStage2Component } from './litera-foundational-stage2.component';

describe('LiteraFoundationalStage2Component', () => {
  let component: LiteraFoundationalStage2Component;
  let fixture: ComponentFixture<LiteraFoundationalStage2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiteraFoundationalStage2Component]
    });
    fixture = TestBed.createComponent(LiteraFoundationalStage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
