import { TestBed } from '@angular/core/testing';

import { IdControllerService } from './id-controller.service';

describe('IdControllerService', () => {
  let service: IdControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
