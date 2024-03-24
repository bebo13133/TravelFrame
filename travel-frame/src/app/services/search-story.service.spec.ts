import { TestBed } from '@angular/core/testing';

import { SearchStoryService } from './search-story.service';

describe('SearchStoryService', () => {
  let service: SearchStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
