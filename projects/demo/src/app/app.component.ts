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
      heartbeatUrl: 'https://localhost:5000',
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
