import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConnectionService } from './ng-connection-service.service';

describe('ConnectionService', () => {
  let connectionService: ConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConnectionService]
    });
    connectionService = TestBed.inject(ConnectionService);
  });

  afterEach(() => {
    connectionService.ngOnDestroy();
  });

  it('should be created', () => {
    expect(connectionService).toBeTruthy();
  });
});