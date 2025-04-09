import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountLiteraParentSupportHubComponent } from './mount-litera-parent-support-hub.component';

describe('MountLiteraParentSupportHubComponent', () => {
  let component: MountLiteraParentSupportHubComponent;
  let fixture: ComponentFixture<MountLiteraParentSupportHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MountLiteraParentSupportHubComponent]
    });
    fixture = TestBed.createComponent(MountLiteraParentSupportHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
