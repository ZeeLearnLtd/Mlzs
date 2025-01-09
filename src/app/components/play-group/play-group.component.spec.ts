import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayGroupComponent } from './play-group.component';

describe('PlayGroupComponent', () => {
  let component: PlayGroupComponent;
  let fixture: ComponentFixture<PlayGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayGroupComponent]
    });
    fixture = TestBed.createComponent(PlayGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
