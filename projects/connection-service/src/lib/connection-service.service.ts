import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private connectionMonitor: Observable<boolean>;
  
  constructor() {
    this.connectionMonitor = new Observable((observer) => {
      window.addEventListener('offline', (e) => {
        observer.next(false);
      });
      window.addEventListener('online', (e) => {
        observer.next(true);
      });
    });
  }

  monitor(): Observable<boolean> {
    return this.connectionMonitor;
  }
}
