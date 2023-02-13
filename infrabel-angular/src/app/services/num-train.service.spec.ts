import { TestBed } from '@angular/core/testing';

import { NumTrainService } from './num-train.service';

describe('NumTrainService', () => {
  let service: NumTrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumTrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
