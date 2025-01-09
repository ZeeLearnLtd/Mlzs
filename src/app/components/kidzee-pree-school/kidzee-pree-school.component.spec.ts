import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidzeePreeSchoolComponent } from './kidzee-pree-school.component';

describe('KidzeePreeSchoolComponent', () => {
  let component: KidzeePreeSchoolComponent;
  let fixture: ComponentFixture<KidzeePreeSchoolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KidzeePreeSchoolComponent]
    });
    fixture = TestBed.createComponent(KidzeePreeSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
