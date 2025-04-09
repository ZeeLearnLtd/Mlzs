import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountLiteraExpertConnectComponent } from './mount-litera-expert-connect.component';

describe('MountLiteraExpertConnectComponent', () => {
  let component: MountLiteraExpertConnectComponent;
  let fixture: ComponentFixture<MountLiteraExpertConnectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MountLiteraExpertConnectComponent]
    });
    fixture = TestBed.createComponent(MountLiteraExpertConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
