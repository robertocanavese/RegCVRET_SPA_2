import { TestBed } from '@angular/core/testing';

import { ScalarService } from './scalar.service';

describe('ScalarService', () => {
  let service: ScalarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScalarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
