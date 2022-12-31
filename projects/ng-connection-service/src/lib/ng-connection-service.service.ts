import { Inject, Injectable, InjectionToken, OnDestroy, Optional } from '@angular/core';
import { BehaviorSubject, fromEvent, interval, Observable, Subscription, switchMap } from 'rxjs';
// import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';

/**
 * Instance of this interface is used to report current connection status.
 */
export interface ConnectionState {
  /**
   * "True" if browser has network connection. Determined by Window objects "online" / "offline" events.
   */
  hasNetworkConnection: boolean;
  /**
   * "True" if browser has Internet access. Determined by heartbeat system which periodically makes request to heartbeat Url.
   */
  hasInternetAccess: boolean;
}

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

/**
 * InjectionToken for specifing ConnectionService options.
 */
export const ConnectionServiceOptionsToken: InjectionToken<ConnectionServiceOptions> = new InjectionToken('ConnectionServiceOptionsToken');

export const DEFAULT_CONNECTION_STATE: ConnectionState = {
  hasInternetAccess: true,
  hasNetworkConnection: window.navigator.onLine
}

export const DEFAULT_HEART_BEAT_INTERVAL = 1000;
// export const DEFAULT_HEART_BEAT_URL = 'https://jsonplaceholder.typicode.com';
export const DEFAULT_HEART_BEAT_URL = 'http://localhost:3000';
export const DEFAULT_HEART_BEAT_RETRY_INTERVAL = 1000;

export enum HTTP_REQUEST_METHODS {
  HEAD = 'head',
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  OPTIONS = 'options'
}

export const DEFAULT_OPTIONS: ConnectionServiceOptions = {
  enableHeartbeat: false,
  heartbeatUrl: DEFAULT_HEART_BEAT_URL,
  heartbeatInterval: DEFAULT_HEART_BEAT_INTERVAL,
  heartbeatRetryInterval: 1000,
  requestMethod: HTTP_REQUEST_METHODS.HEAD
};

@Injectable({
  providedIn: 'root'
})
export class ConnectionService implements OnDestroy {

  private currentState: ConnectionState = DEFAULT_CONNECTION_STATE;
  private serviceOptions: ConnectionServiceOptions = DEFAULT_OPTIONS;

  private subscription: Subscription = new Subscription();
  private httpSubscription: Subscription = new Subscription();

  private stateChanged$ = new BehaviorSubject<ConnectionState>(DEFAULT_CONNECTION_STATE);

  constructor(private http: HttpClient, @Inject(ConnectionServiceOptionsToken) @Optional() options: ConnectionServiceOptions) {
    // TODO: Token useValue in providers not working.
    this.serviceOptions = { ...DEFAULT_OPTIONS, ...options };
    this.checkNetworkState();

    if (this.serviceOptions.enableHeartbeat) {
      this.checkInternetState();
    }
  }

  private checkNetworkState() {
    this.subscription.add(fromEvent(window, 'online').subscribe(() => {
      this.currentState.hasNetworkConnection = true;
      this.checkInternetState();
      this.publishState();
    }));

    this.subscription.add(fromEvent(window, 'offline').subscribe(() => {
      this.currentState.hasNetworkConnection = false;
      this.checkInternetState();
      this.publishState();
    }));
  }

  private checkInternetState() {

    if (this.serviceOptions.enableHeartbeat) {
      this.subscription = interval(3000).pipe(
        switchMap(async () =>
          this.http[this.serviceOptions.requestMethod || HTTP_REQUEST_METHODS.HEAD](this.serviceOptions.heartbeatUrl || DEFAULT_HEART_BEAT_URL,
            { responseType: 'text' }).subscribe(
              {
                next: (data) => {
                  this.currentState.hasInternetAccess = true;
                  this.publishState();
                },

                error: (err) => {
                  this.currentState.hasInternetAccess = false;
                  this.publishState();
                  throw err;
                },
              }
            )
        )
      ).subscribe(
        res => {
        }
      );
      // this.httpSubscription = timer(0, this.serviceOptions.heartbeatInterval || DEFAULT_HEART_BEAT_INTERVAL)
      //   .pipe(
      //     switchMap(async () => this.http[this.serviceOptions.requestMethod || HTTP_REQUEST_METHODS.HEAD](this.serviceOptions.heartbeatUrl || DEFAULT_HEART_BEAT_URL,
      //       { responseType: 'text' })),
      //     retryWhen(errors =>
      //       errors.pipe(
      //         // log error message
      //         tap(val => {
      //           this.currentState.hasInternetAccess = false;
      //           this.publishState();
      //           throw errors;
      //         }),
      //         // restart after 5 seconds
      //         delay(this.serviceOptions.heartbeatRetryInterval || DEFAULT_HEART_BEAT_RETRY_INTERVAL)
      //       )
      //     )
      //   )
      //   .subscribe(result => {
      //     this.currentState.hasInternetAccess = true;
      //     this.publishState();
      //   });
    } else {
      this.currentState.hasInternetAccess = false;
      this.publishState();
    }
  }

  private publishState() {
    this.stateChanged$.next(this.currentState);
  }

  /**
 * Monitor Network & Internet connection status by subscribing to this observer. If you set "reportCurrentState" to "false" then
 * function will not report current status of the connections when initially subscribed.
 * @param reportCurrentState Report current state when initial subscription. Default is "true"
 */
  public monitor(options?: ConnectionServiceOptions): Observable<ConnectionState> {
    if (options) {
      this.serviceOptions = { ...this.serviceOptions, ...options };
    }
    if(this.serviceOptions.enableHeartbeat) {
      this.checkInternetState();
    }
    return this.stateChanged$;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
