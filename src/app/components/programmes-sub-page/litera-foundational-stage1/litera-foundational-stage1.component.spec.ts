import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraFoundationalStage1Component } from './litera-foundational-stage1.component';

describe('LiteraFoundationalStage1Component', () => {
  let component: LiteraFoundationalStage1Component;
  let fixture: ComponentFixture<LiteraFoundationalStage1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiteraFoundationalStage1Component]
    });
    fixture = TestBed.createComponent(LiteraFoundationalStage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
