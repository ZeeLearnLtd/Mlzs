import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateusforhyperlocalComponent } from './locateusforhyperlocal.component';

describe('LocateusforhyperlocalComponent', () => {
  let component: LocateusforhyperlocalComponent;
  let fixture: ComponentFixture<LocateusforhyperlocalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocateusforhyperlocalComponent]
    });
    fixture = TestBed.createComponent(LocateusforhyperlocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
