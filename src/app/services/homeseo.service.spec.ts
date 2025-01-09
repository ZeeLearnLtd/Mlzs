import { TestBed } from '@angular/core/testing';

import { HomeseoService } from './homeseo.service';

describe('HomeseoService', () => {
  let service: HomeseoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeseoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
