import {Component} from '@angular/core';
import {ConnectionState, ConnectionService} from 'ng-connection-service';

@Component({
  selector: 'app-status-check',
  templateUrl: './status-check.component.html',
  styleUrls: ['./status-check.component.css']
})
export class StatusCheckComponent {

  currentState: ConnectionState;

  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe((currentState: ConnectionState) => {
      console.log(currentState);
      this.currentState = currentState;
    });
  }

}
