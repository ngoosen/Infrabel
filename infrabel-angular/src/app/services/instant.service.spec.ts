import { TestBed } from '@angular/core/testing';

import { InstantService } from './instant.service';

describe('InstantService', () => {
  let service: InstantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
