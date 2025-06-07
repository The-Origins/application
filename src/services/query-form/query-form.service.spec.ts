import { TestBed } from '@angular/core/testing';

import { QueryFormService } from './query-form.service';

describe('QueryFormService', () => {
  let service: QueryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
