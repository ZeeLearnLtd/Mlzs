import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverNewsComponent } from './discover-news.component';

describe('DiscoverNewsComponent', () => {
  let component: DiscoverNewsComponent;
  let fixture: ComponentFixture<DiscoverNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoverNewsComponent]
    });
    fixture = TestBed.createComponent(DiscoverNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
