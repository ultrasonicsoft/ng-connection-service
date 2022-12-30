import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConnectionServiceModule, ConnectionServiceOptions, ConnectionServiceOptionsToken } from 'projects/ng-connection-service/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ConnectionServiceModule
  ],
  providers: [
    {
      provide: ConnectionServiceOptionsToken,
      useValue: <ConnectionServiceOptions>{
        enableHeartbeat: false,
        heartbeatUrl: '/assets/ping.json',
        requestMethod: 'get',
        heartbeatInterval: 4000
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
