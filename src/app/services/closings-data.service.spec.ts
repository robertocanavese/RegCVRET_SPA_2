import { TestBed } from '@angular/core/testing';

import { ClosingsDataService } from './closings-data.service';

describe('ClosingsDataService', () => {
  let service: ClosingsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClosingsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
