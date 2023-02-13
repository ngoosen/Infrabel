import { TestBed } from '@angular/core/testing';

import { IncidentTypesService } from './incident-types.service';

describe('IncidentTypesService', () => {
  let service: IncidentTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
