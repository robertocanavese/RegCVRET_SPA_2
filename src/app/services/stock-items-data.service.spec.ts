import { TestBed } from '@angular/core/testing';

import { StockItemDataService } from './stock-items-data.service';

describe('MovementsDataService', () => {
  let service: StockItemDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockItemDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
