import { TestBed } from '@angular/core/testing';

import { FormatDataService } from './format-data.service';

describe('FormatDataService', () => {
  let service: FormatDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
