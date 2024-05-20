import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConnectionServiceModule } from 'ng-connection-service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ConnectionServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
