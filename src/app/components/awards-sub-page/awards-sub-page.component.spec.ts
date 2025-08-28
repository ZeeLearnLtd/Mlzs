import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsSubPageComponent } from './awards-sub-page.component';

describe('AwardsSubPageComponent', () => {
  let component: AwardsSubPageComponent;
  let fixture: ComponentFixture<AwardsSubPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwardsSubPageComponent]
    });
    fixture = TestBed.createComponent(AwardsSubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
