import { TestBed } from '@angular/core/testing';

import { DarklyService } from './darkly.service';

describe('DarklyService', () => {
  let service: DarklyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarklyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
