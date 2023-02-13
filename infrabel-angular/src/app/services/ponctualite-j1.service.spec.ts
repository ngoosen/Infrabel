import { TestBed } from '@angular/core/testing';

import { PonctualiteJ1Service } from './ponctualite-j1.service';

describe('PonctualiteJ1Service', () => {
  let service: PonctualiteJ1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PonctualiteJ1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
