import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSiteMapComponent } from './test-site-map.component';

describe('TestSiteMapComponent', () => {
  let component: TestSiteMapComponent;
  let fixture: ComponentFixture<TestSiteMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestSiteMapComponent]
    });
    fixture = TestBed.createComponent(TestSiteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
