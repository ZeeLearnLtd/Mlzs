import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSchoolComponent } from './start-school.component';

describe('StartSchoolComponent', () => {
  let component: StartSchoolComponent;
  let fixture: ComponentFixture<StartSchoolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartSchoolComponent]
    });
    fixture = TestBed.createComponent(StartSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
