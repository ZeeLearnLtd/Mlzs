import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBlogsComponent } from './main-blogs.component';

describe('MainBlogsComponent', () => {
  let component: MainBlogsComponent;
  let fixture: ComponentFixture<MainBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainBlogsComponent]
    });
    fixture = TestBed.createComponent(MainBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
