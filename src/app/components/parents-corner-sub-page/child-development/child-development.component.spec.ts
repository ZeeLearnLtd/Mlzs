import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDevelopmentComponent } from './child-development.component';

describe('ChildDevelopmentComponent', () => {
  let component: ChildDevelopmentComponent;
  let fixture: ComponentFixture<ChildDevelopmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildDevelopmentComponent]
    });
    fixture = TestBed.createComponent(ChildDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
