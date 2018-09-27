import { TestBed, inject } from '@angular/core/testing';

import { CtsApiService } from './cts-api.service';

describe('CtsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CtsApiService]
    });
  });

  it('should be created', inject([CtsApiService], (service: CtsApiService) => {
    expect(service).toBeTruthy();
  }));
});
