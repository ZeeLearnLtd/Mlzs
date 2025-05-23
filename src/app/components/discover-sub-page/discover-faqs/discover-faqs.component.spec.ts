import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverFaqsComponent } from './discover-faqs.component';

describe('DiscoverFaqsComponent', () => {
  let component: DiscoverFaqsComponent;
  let fixture: ComponentFixture<DiscoverFaqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoverFaqsComponent]
    });
    fixture = TestBed.createComponent(DiscoverFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
