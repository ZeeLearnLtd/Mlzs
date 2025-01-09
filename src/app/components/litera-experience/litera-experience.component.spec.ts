import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraExperienceComponent } from './litera-experience.component';

describe('LiteraExperienceComponent', () => {
  let component: LiteraExperienceComponent;
  let fixture: ComponentFixture<LiteraExperienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiteraExperienceComponent]
    });
    fixture = TestBed.createComponent(LiteraExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
