import { TestBed } from '@angular/core/testing';

import { NgxAngularQrcodeService } from './ngx-angular-qrcode.service';

describe('NgxAngularQrcodeService', () => {
  let service: NgxAngularQrcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxAngularQrcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
