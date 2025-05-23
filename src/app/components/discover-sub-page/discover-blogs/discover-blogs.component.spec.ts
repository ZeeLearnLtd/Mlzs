import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverBlogsComponent } from './discover-blogs.component';

describe('DiscoverBlogsComponent', () => {
  let component: DiscoverBlogsComponent;
  let fixture: ComponentFixture<DiscoverBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoverBlogsComponent]
    });
    fixture = TestBed.createComponent(DiscoverBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
