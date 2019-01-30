import { TestBed, inject } from '@angular/core/testing';

import { GmapGuardService } from './gmap-guard.service';

describe('GmapGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GmapGuardService]
    });
  });

  it('should be created', inject([GmapGuardService], (service: GmapGuardService) => {
    expect(service).toBeTruthy();
  }));
});
