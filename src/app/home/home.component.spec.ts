import {NO_ERRORS_SCHEMA} from '@angular/core';
import {
  TestBed,
  async,
  fakeAsync,
  ComponentFixture
} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';

import {HomeComponent} from './home.component';
import {UserService} from '../shared/services/user.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {AlertService} from '../shared/alert/alert.service';
import {of} from 'rxjs/observable/of';
import {User} from '../shared/models/user.model';

let comp: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;

describe('HomeComponent of home module', () => {

  class RouterStub {
    navigateByUrl(url: string) {
      return url;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        FormBuilder, DatePipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(HomeComponent, {
        set: {
          providers: [
            {provide: UserService, useValue: {}},
            {
              provide: AlertService, useValue: {
              info: function () {
                return '';
              }
            }
            },
            {
              provide: ActivatedRoute, useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) => fn({
                  name: 'Stepan'
                })
              }
            }
            },
            {provide: Router, useClass: RouterStub},
          ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
      });
  }));

  function updateForm(cvvNumber) {
    comp.securityForm.controls['cvv'].setValue(cvvNumber);
  }

  it('should have default title', fakeAsync(() => {
    expect(comp.title).toEqual('Security Number');
  }));

  it('form value should update from form changes', fakeAsync(() => {
    updateForm(123);
    expect(comp.securityForm.value).toEqual({cvv: 123});
  }));

  it('should check default value of isSubmit', fakeAsync(() => {
    expect(comp.isSubmitting).toEqual(false);
  }));
});
