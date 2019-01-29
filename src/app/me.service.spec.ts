import { TestBed, inject } from '@angular/core/testing';

import { MeService } from './me.service';

describe('MeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeService]
    });
  });

  it('should be created', inject([MeService], (service: MeService) => {
    expect(service).toBeTruthy();
  }));
});
