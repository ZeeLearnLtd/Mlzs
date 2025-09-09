import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicsMainPageComponent } from './academics-main-page.component';

describe('AcademicsMainPageComponent', () => {
  let component: AcademicsMainPageComponent;
  let fixture: ComponentFixture<AcademicsMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicsMainPageComponent]
    });
    fixture = TestBed.createComponent(AcademicsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
