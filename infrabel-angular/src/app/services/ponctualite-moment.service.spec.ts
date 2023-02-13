import { TestBed } from '@angular/core/testing';

import { PonctualiteMomentService } from './ponctualite-moment.service';

describe('PonctualiteMomentService', () => {
  let service: PonctualiteMomentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PonctualiteMomentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
