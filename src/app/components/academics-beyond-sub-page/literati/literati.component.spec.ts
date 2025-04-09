import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteratiComponent } from './literati.component';

describe('LiteratiComponent', () => {
  let component: LiteratiComponent;
  let fixture: ComponentFixture<LiteratiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiteratiComponent]
    });
    fixture = TestBed.createComponent(LiteratiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
