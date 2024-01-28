import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgStyle } from '@angular/common';

// TODO(ng16-upgrade) - replace relative import with package import
import { ConnectionService, ConnectionState } from '../../../../ng-connection-service/src/public-api';
import { ConnectionServiceModule } from '../../../../ng-connection-service/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ConnectionServiceModule,
    NgStyle
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-connection-demo-v17';
  hasNetworkConnection!: boolean;
  hasInternetAccess!: boolean;
  status!: string;

  currentState!: ConnectionState;

  subscription = new Subscription();

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.connectionService.monitor().subscribe({
        next: (newState: ConnectionState) => {
          this.currentState = newState;
          if (newState.hasNetworkConnection && newState.hasInternetAccess) {
            this.status = 'ONLINE';
          } else {
            this.status = 'OFFLINE';
          }
          console.debug('🔥 newState', newState);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
