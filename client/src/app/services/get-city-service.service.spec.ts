import { TestBed } from '@angular/core/testing';

import { GetCityServiceService } from './get-city-service.service';

describe('GetCityServiceService', () => {
  let service: GetCityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
