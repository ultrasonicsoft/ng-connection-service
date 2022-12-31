import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ConnectionServiceModule } from 'ng-connection-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ConnectionServiceModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
