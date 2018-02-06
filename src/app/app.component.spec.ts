import {NO_ERRORS_SCHEMA} from '@angular/core';
import {
  TestBed,
  async,
  ComponentFixture
} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {UserService} from './shared/services/user.service';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent of app module', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [
        {provide: UserService, useValue: {}}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
      });
  }));

  it('should initialized component', () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });
});
