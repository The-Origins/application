import { TestBed } from '@angular/core/testing';

import { BookingFormService } from './booking-form.service';

describe('BookingFormService', () => {
  let service: BookingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
