import { TestBed } from '@angular/core/testing';

import { RoutineSettingsService } from './routine-settings.service';

describe('RoutineSettingsService', () => {
  let service: RoutineSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
