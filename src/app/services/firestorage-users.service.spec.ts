import { TestBed } from '@angular/core/testing';

import { FirestorageUsersService } from './firestorage-users.service';

describe('FirestorageUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirestorageUsersService = TestBed.get(FirestorageUsersService);
    expect(service).toBeTruthy();
  });
});
