import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {
  HeaderComponent,
  FooterComponent,
  JwtService,
  UserService,
  ApiService,
  SharedModule,
  AlertComponent,
  AlertService
} from './shared';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

const rootRoutes = RouterModule.forRoot([]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    rootRoutes,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    JwtService,
    UserService,
    ApiService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
