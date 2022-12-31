# Internet Connection Monitoring Service (Angular v9-v15)

> Detects whether browser has an active internet connection or not in Angular application. 

> Detects whether your API Server is running or not in Angular application. 

>> Note that, this library is being updated to support most of the Angular versions. Currently, it supports Angular v9 till v15, and verified with demos. Meanwhile, for Angular 8 and earlier versions, try installing package with version 1.0.4 `npm i ng-connection-service@1.0.4`. Stay tuned for updates.


## Install

You can get it on npm.

```
npm install ng-connection-service --save
```

## Setup

*  Import `HttpClientModule` and `ConnectionServiceModule` into your application `AppModule`

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ConnectionServiceModule } from 'ng-connection-service';

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
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## Usage - Check only internet connection status
* Inject `ConnectionService` in Angular component's constructor, subscribe to `monitor()` method.


```ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConnectionService, ConnectionServiceOptions, ConnectionState } from 'ng-connection-service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'demo';

  status!: string;
  currentState!: ConnectionState;
  subscription = new Subscription();

  constructor(private connectionService: ConnectionService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.connectionService.monitor(options).pipe(
        tap((newState: ConnectionState) => {
          this.currentState = newState;

          if (this.currentState.hasNetworkConnection) {
            this.status = 'ONLINE';
          } else {
            this.status = 'OFFLINE';
          }
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

```

## Usage - Check YOUR API Server connection status

* Inject `ConnectionService` in Angular component's constructor, subscribe to `monitor()` method. Here `hasInternetConnection` boolean property informs if given server URL passed via `heartbeatUrl` property is reachable or not.


```ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConnectionService, ConnectionServiceOptions, ConnectionState } from 'ng-connection-service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'demo';

  status!: string;
  currentState!: ConnectionState;
  subscription = new Subscription();

  constructor(private connectionService: ConnectionService) {
  }

  ngOnInit(): void {
    const options: ConnectionServiceOptions = {
      enableHeartbeat: false,
      heartbeatUrl: 'https://localhost:4000',
      heartbeatInterval: 2000
    }
    this.subscription.add(
      this.connectionService.monitor(options).pipe(
        tap((newState: ConnectionState) => {
          this.currentState = newState;

          if (this.currentState.hasNetworkConnection && this.currentState.hasInternetAccess) {
            this.status = 'ONLINE';
          } else {
            this.status = 'OFFLINE';
          }
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

```

* Note that we have passed configuration object to `monitor()` function to watch application server status.

```ts
 const options: ConnectionServiceOptions = {
      enableHeartbeat: false,
      heartbeatUrl: 'https://localhost:5000',
      heartbeatInterval: 2000
    }
```

## Demos

You can find demos in GitHub repository under directory `projects/demo/`.
* [Angular v9 Demo](https://github.com/ultrasonicsoft/ng-connection-service/tree/main/projects/demo/ng-connection-demo-v9)
* [Angular v10 Demo](https://github.com/ultrasonicsoft/ng-connection-service/tree/main/projects/demo/ng-connection-demo-v10)
* [Angular v11 Demo](https://github.com/ultrasonicsoft/ng-connection-service/tree/main/projects/demo/ng-connection-demo-v11)
* [Angular v12 Demo](https://github.com/ultrasonicsoft/ng-connection-service/tree/main/projects/demo/ng-connection-demo-v12)
* [Angular v13 Demo](https://github.com/ultrasonicsoft/ng-connection-service/tree/main/projects/demo/ng-connection-demo-v13)
* [Angular v14 Demo](https://github.com/ultrasonicsoft/ng-connection-service/tree/main/projects/demo/ng-connection-demo-v14)
* [Angular v15 Demo](https://github.com/ultrasonicsoft/ng-connection-service/tree/main/projects/demo/ng-connection-demo-v15)

## API

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

## Demo

[Working demo](https://ng-connection-service-demo.surge.sh/)

## License

[MIT License](https://github.com/ultrasonicsoft/ng-connection-service/blob/master/LICENSE) © Balram Chavan
