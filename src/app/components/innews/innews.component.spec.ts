import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnewsComponent } from './innews.component';

describe('InnewsComponent', () => {
  let component: InnewsComponent;
  let fixture: ComponentFixture<InnewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InnewsComponent]
    });
    fixture = TestBed.createComponent(InnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
