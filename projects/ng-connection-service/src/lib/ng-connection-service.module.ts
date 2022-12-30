import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConnectionService } from './ng-connection-service.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [ConnectionService]
})
export class ConnectionServiceModule { }
