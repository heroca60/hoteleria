import { TestBed } from '@angular/core/testing';

import { HotelfilterService } from './hotelfilter.service';

describe('HotelfilterService', () => {
  let service: HotelfilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelfilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
