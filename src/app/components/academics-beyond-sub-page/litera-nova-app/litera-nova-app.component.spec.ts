import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraNovaAppComponent } from './litera-nova-app.component';

describe('LiteraNovaAppComponent', () => {
  let component: LiteraNovaAppComponent;
  let fixture: ComponentFixture<LiteraNovaAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiteraNovaAppComponent]
    });
    fixture = TestBed.createComponent(LiteraNovaAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
