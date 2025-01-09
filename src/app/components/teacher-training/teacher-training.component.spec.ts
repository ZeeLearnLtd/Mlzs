import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTrainingComponent } from './teacher-training.component';

describe('TeacherTrainingComponent', () => {
  let component: TeacherTrainingComponent;
  let fixture: ComponentFixture<TeacherTrainingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherTrainingComponent]
    });
    fixture = TestBed.createComponent(TeacherTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
