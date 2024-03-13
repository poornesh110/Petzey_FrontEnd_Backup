import { TestBed } from '@angular/core/testing';

import { CredserviceService } from './credservice.service';

describe('CredserviceService', () => {
  let service: CredserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
