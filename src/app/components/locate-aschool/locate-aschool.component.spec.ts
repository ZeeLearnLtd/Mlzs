import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateASchoolComponent } from './locate-aschool.component';

describe('LocateASchoolComponent', () => {
  let component: LocateASchoolComponent;
  let fixture: ComponentFixture<LocateASchoolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocateASchoolComponent]
    });
    fixture = TestBed.createComponent(LocateASchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
