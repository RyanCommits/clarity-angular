import { TestBed, inject } from '@angular/core/testing';

import { EntryApiService } from './entry-api.service';

describe('EntryApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryApiService]
    });
  });

  it('should be created', inject([EntryApiService], (service: EntryApiService) => {
    expect(service).toBeTruthy();
  }));
});
