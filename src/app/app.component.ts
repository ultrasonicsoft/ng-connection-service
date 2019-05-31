import {Component} from '@angular/core';
import {ConnectionService} from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  heartBeatState;

  constructor(private connectionService: ConnectionService) {
    this.heartBeatState = this.connectionService.options.enableHeartbeat;
  }

  setHeartBeatState(state: boolean) {
    this.heartBeatState = state;
    this.connectionService.updateOptions({enableHeartbeat: state});
  }
}
