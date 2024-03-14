import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cantActiveGuard } from './cant-active.guard';

describe('cantActiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cantActiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
