import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurLegacyComponent } from './our-legacy.component';

describe('OurLegacyComponent', () => {
  let component: OurLegacyComponent;
  let fixture: ComponentFixture<OurLegacyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurLegacyComponent]
    });
    fixture = TestBed.createComponent(OurLegacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
