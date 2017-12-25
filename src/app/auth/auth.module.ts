import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {RouterModule} from '@angular/router';
import {NotAuthorize} from './not-authorize.service';
import {SharedModule} from '../shared';

const authRoute: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NotAuthorize]
  },
  {
    path: 'signup',
    component: AuthComponent,
    canActivate: [NotAuthorize]
  }
]);

@NgModule({
  imports: [
    CommonModule,
    authRoute,
    SharedModule
  ],
  declarations: [AuthComponent],
  providers: [NotAuthorize]
})
export class AuthModule {
}
