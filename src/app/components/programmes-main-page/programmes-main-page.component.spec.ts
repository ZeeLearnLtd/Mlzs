import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammesMainPageComponent } from './programmes-main-page.component';

describe('ProgrammesMainPageComponent', () => {
  let component: ProgrammesMainPageComponent;
  let fixture: ComponentFixture<ProgrammesMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgrammesMainPageComponent]
    });
    fixture = TestBed.createComponent(ProgrammesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
