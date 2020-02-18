# Internet Connection Monitoring Service (Angular v9)

> Detects whether browser has an active internet connection or not in Angular application. 

## Install

You can get it on npm.

```
npm install ng-connection-service --save
```

## Usage

1. Inject `ConnectionService` in Angular component's constructor.
2. Subscribe to `monitor()` method to get push notification whenever internet connection status is changed.

```ts
import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hasNetworkConnection: boolean;
  hasInternetAccess: boolean;
  status: string;

  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe(currentState => {
      this.hasNetworkConnection = currentState.hasNetworkConnection;
      this.hasInternetAccess = currentState.hasInternetAccess;
      if (this.hasNetworkConnection && this.hasInternetAccess) {
        this.status = 'ONLINE';
      } else {
        this.status = 'OFFLINE';
      }
    });
  }
}

```

## Configuration

You can configure the service using `ConnectionServiceOptions` configuration variable. 
Following options are available;

```ts
/**
 * Instance of this interface could be used to configure "ConnectionService".
 */
export interface ConnectionServiceOptions {
  /**
   * Controls the Internet connectivity heartbeat system. Default value is 'true'.
   */
  enableHeartbeat?: boolean;
  /**
   * Url used for checking Internet connectivity, heartbeat system periodically makes "HEAD" requests to this URL to determine Internet
   * connection status. Default value is "//internethealthtest.org".
   */
  heartbeatUrl?: string;
  /**
   * Interval used to check Internet connectivity specified in milliseconds. Default value is "30000".
   */
  heartbeatInterval?: number;
  /**
   * Interval used to retry Internet connectivity checks when an error is detected (when no Internet connection). Default value is "1000".
   */
  heartbeatRetryInterval?: number;
  /**
   * HTTP method used for requesting heartbeat Url. Default is 'head'.
   */
  requestMethod?: 'get' | 'post' | 'head' | 'options';

}
```

You should define a provider for `ConnectionServiceOptionsToken` in your module as follows;

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ConnectionServiceModule, ConnectionServiceOptions, ConnectionServiceOptionsToken} from 'ng-connection-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ConnectionServiceModule
  ],
  providers: [
    {
      provide: ConnectionServiceOptionsToken,
      useValue: <ConnectionServiceOptions>{
        enableHeartbeat: false,
        heartbeatUrl: '/assets/ping.json',
        requestMethod: 'get',
        heartbeatInterval: 3000
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

```

## Demo

[Working demo](https://ng-connection-service-demo.surge.sh/)

## License

[MIT License](https://github.com/ultrasonicsoft/ng-connection-service/blob/master/LICENSE) © Balram Chavan
