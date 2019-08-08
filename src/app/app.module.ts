import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ConnectionServiceModule, ConnectionServiceOptions, ConnectionServiceOptionsToken} from 'ng-connection-service';
import { StatusCheckComponent } from './components/status-check/status-check.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusCheckComponent
  ],
  imports: [
    BrowserModule,
    ConnectionServiceModule
  ],
  providers: [
    {
      provide: ConnectionServiceOptionsToken,
      useValue: <ConnectionServiceOptions>{
        // enableHeartbeat: true,
        // heartbeatUrl: '/api/v1/conexion/test',
        // requestMethod: 'get',
        // heartbeatInterval: 3000
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
