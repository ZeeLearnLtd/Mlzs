import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverGalleryComponent } from './discover-gallery.component';

describe('DiscoverGalleryComponent', () => {
  let component: DiscoverGalleryComponent;
  let fixture: ComponentFixture<DiscoverGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoverGalleryComponent]
    });
    fixture = TestBed.createComponent(DiscoverGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
