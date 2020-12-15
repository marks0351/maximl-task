import { TestBed } from '@angular/core/testing';

import { WeatherDataSyncService } from './weather-data-sync.service';

describe('WeatherDataSyncService', () => {
  let service: WeatherDataSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherDataSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
