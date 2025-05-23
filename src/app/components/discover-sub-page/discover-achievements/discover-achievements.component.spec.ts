import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverAchievementsComponent } from './discover-achievements.component';

describe('DiscoverAchievementsComponent', () => {
  let component: DiscoverAchievementsComponent;
  let fixture: ComponentFixture<DiscoverAchievementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoverAchievementsComponent]
    });
    fixture = TestBed.createComponent(DiscoverAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
