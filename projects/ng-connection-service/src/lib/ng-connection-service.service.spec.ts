import { TestBed } from '@angular/core/testing';

import { NgConnectionServiceService } from './ng-connection-service.service';

describe('NgConnectionServiceService', () => {
  let service: NgConnectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgConnectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
