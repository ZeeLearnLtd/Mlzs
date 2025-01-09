import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialWallComponent } from './social-wall.component';

describe('SocialWallComponent', () => {
  let component: SocialWallComponent;
  let fixture: ComponentFixture<SocialWallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialWallComponent]
    });
    fixture = TestBed.createComponent(SocialWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
