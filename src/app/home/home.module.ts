import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeAuthResolver} from './home-auth-resolver.service';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';


const homeRouting = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    resolve: {
      isAuthenticated: HomeAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    CommonModule,
    homeRouting,
    SharedModule
  ],
  declarations: [HomeComponent],
  providers: [HomeAuthResolver]
})
export class HomeModule {
}
