import { TestBed } from '@angular/core/testing';

import { ProfilePhotoService } from './profile-photo.service';

describe('ProfilePhotoService', () => {
  let service: ProfilePhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilePhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
