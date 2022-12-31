import { Component } from '@angular/core';
import { ConnectionService, ConnectionState } from 'ng-connection-service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-connection-demo-v15';
  hasNetworkConnection!: boolean;
  hasInternetAccess!: boolean;
  status!: string;

  currentState!: ConnectionState;

  subscription = new Subscription();

  constructor(private connectionService: ConnectionService) {

  }

  ngOnInit(): void {
    this.subscription.add(
      this.connectionService.monitor().pipe(
        tap((newState: ConnectionState) => {
          this.currentState = newState;
          if (newState.hasNetworkConnection && newState.hasInternetAccess) {
            this.status = 'ONLINE';
          } else {
            this.status = 'OFFLINE';
          }
          console.debug('🔥 newState', newState);
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
