import { TestBed } from '@angular/core/testing';

import { ParamsInUrlService } from './params-in-url.service';

describe('ParamsInUrlService', () => {
  let service: ParamsInUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamsInUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
