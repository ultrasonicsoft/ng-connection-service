import { Component } from '@angular/core';
import { ConnectionState, ConnectionService, ConnectionServiceOptions } from 'ng-connection-service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-connection-demo-v10';

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
