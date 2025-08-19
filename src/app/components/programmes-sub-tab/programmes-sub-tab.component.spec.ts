import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammesSubTabComponent } from './programmes-sub-tab.component';

describe('ProgrammesSubTabComponent', () => {
  let component: ProgrammesSubTabComponent;
  let fixture: ComponentFixture<ProgrammesSubTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgrammesSubTabComponent]
    });
    fixture = TestBed.createComponent(ProgrammesSubTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
