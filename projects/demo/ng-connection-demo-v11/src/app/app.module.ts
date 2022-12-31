import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ConnectionServiceModule } from 'ng-connection-service';

import { AppComponent } from './app.component';

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
