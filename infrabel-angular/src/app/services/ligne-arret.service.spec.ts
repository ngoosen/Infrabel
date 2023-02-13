import { TestBed } from '@angular/core/testing';

import { LigneArretService } from './ligne-arret.service';

describe('LigneArretService', () => {
  let service: LigneArretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneArretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
