import { TestBed } from '@angular/core/testing';

import { AgssService } from './agss.service';

describe('AgssService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgssService = TestBed.get(AgssService);
    expect(service).toBeTruthy();
  });
});
