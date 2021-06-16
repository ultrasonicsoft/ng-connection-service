import { fromEvent, Observable, Subject, Subscription, timer } from "rxjs";
import { debounceTime, startWith } from "rxjs/operators";
import * as _ from "lodash-es";

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
   * Url used for checking Internet connectivity, heartbeat system periodically makes a requests to this URL to determine Internet
   * connection status. Default value is "https://google.com".
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
}

export class ConnectionService {
  private static DEFAULT_OPTIONS: ConnectionServiceOptions = {
    enableHeartbeat: true,
    heartbeatUrl: "https://google.com",
    heartbeatInterval: 10000,
  };

  private stateChangeEventEmitter = new Subject<ConnectionState>();

  private currentState: ConnectionState = {
    hasInternetAccess: false,
    hasNetworkConnection: window.navigator.onLine,
  };
  private offlineSubscription: Subscription;
  private onlineSubscription: Subscription;
  private httpSubscription: Subscription;
  private serviceOptions: ConnectionServiceOptions;

  /**
   * Current ConnectionService options. Notice that changing values of the returned object has not effect on service execution.
   * You should use "updateOptions" function.
   */
  get options(): ConnectionServiceOptions {
    return _.clone(this.serviceOptions);
  }

  constructor(options?: ConnectionServiceOptions) {
    this.serviceOptions = _.defaults(
      {},
      options,
      ConnectionService.DEFAULT_OPTIONS
    );

    this.checkNetworkState();
    this.checkInternetState();
  }

  private checkInternetState() {
    if (!_.isNil(this.httpSubscription)) {
      this.httpSubscription.unsubscribe();
    }

    if (this.serviceOptions.enableHeartbeat) {
      this.httpSubscription = timer(
        0,
        this.serviceOptions.heartbeatInterval
      ).subscribe(() => {
        fetch(this.serviceOptions.heartbeatUrl, { mode: "no-cors" }).then(
          (response) => {
            this.currentState.hasInternetAccess = response.type === "opaque";
            this.emitEvent();
          }
        );
      });
    } else {
      this.currentState.hasInternetAccess =
        this.currentState.hasNetworkConnection;
      this.emitEvent();
    }
  }

  private checkNetworkState(): void {
    this.onlineSubscription = fromEvent(window, "online").subscribe(() => {
      this.currentState.hasNetworkConnection = true;
      this.checkInternetState();
      this.emitEvent();
    });

    this.offlineSubscription = fromEvent(window, "offline").subscribe(() => {
      this.currentState.hasNetworkConnection = false;
      this.currentState.hasInternetAccess = false;
      this.emitEvent();
    });
  }

  private emitEvent(): void {
    this.stateChangeEventEmitter.next(this.currentState);
  }

  ngOnDestroy(): void {
    try {
      this.offlineSubscription.unsubscribe();
      this.onlineSubscription.unsubscribe();
      this.httpSubscription.unsubscribe();
    } catch (e) {}
  }

  /**
   * Monitor Network & Internet connection status by subscribing to this observer. If you set "reportCurrentState" to "false" then
   * function will not report current status of the connections when initially subscribed.
   * @param reportCurrentState Report current state when initial subscription. Default is "true"
   */
  monitor(reportCurrentState = true): Observable<ConnectionState> {
    return reportCurrentState
      ? this.stateChangeEventEmitter.pipe(
          debounceTime(300),
          startWith(this.currentState)
        )
      : this.stateChangeEventEmitter.pipe(debounceTime(300));
  }

  /**
   * Update options of the service. You could specify partial options object. Values that are not specified will use default / previous
   * option values.
   * @param options Partial option values.
   */
  updateOptions(options: Partial<ConnectionServiceOptions>) {
    this.serviceOptions = _.defaults({}, options, this.serviceOptions);
    this.checkInternetState();
  }
}
