import {CommonModule} from '@angular/common';
import {Injector, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Router, RouterModule} from '@angular/router';
import {IsAuthDirective} from './is-auth.directive';
import {ListErrorsComponent} from './list-errors.component';
import {DatePipe} from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    IsAuthDirective,
    ListErrorsComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    IsAuthDirective,
    ListErrorsComponent,
    DatePipe
  ],
  providers: [
    DatePipe,
  ]
})
export class SharedModule {
}
