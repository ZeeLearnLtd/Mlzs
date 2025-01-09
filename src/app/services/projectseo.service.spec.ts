import { TestBed } from '@angular/core/testing';

import { ProjectseoService } from './projectseo.service';

describe('ProjectseoService', () => {
  let service: ProjectseoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectseoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
