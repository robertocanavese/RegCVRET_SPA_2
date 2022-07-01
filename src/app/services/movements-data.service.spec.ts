import { TestBed } from '@angular/core/testing';

import { MovementsDataService } from './movements-data.service';

describe('StockItemsDataService', () => {
  let service: MovementsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovementsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
