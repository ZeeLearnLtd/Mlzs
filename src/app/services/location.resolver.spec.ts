import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { locationResolver } from './location.resolver';

describe('locationResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => locationResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
