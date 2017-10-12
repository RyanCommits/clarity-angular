import { TestBed, inject } from '@angular/core/testing';

import { CalendarTrackService } from './calendar-track.service';

describe('CalendarTrackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarTrackService]
    });
  });

  it('should be created', inject([CalendarTrackService], (service: CalendarTrackService) => {
    expect(service).toBeTruthy();
  }));
});
