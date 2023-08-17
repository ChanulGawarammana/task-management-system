import { TestBed } from '@angular/core/testing';

import { WebreqInterceptorService } from './webreq.interceptor.service';

describe('WebreqInterceptorService', () => {
  let service: WebreqInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebreqInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
