import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammesListComponent } from './programmes-list.component';

describe('ProgrammesListComponent', () => {
  let component: ProgrammesListComponent;
  let fixture: ComponentFixture<ProgrammesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgrammesListComponent]
    });
    fixture = TestBed.createComponent(ProgrammesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
