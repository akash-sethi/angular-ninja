import {NO_ERRORS_SCHEMA} from '@angular/core';
import {
  TestBed,
  async,
  ComponentFixture
} from '@angular/core/testing';

import {AlertComponent} from './alert.component';
import {AlertService} from './alert.service';

let comp: AlertComponent;
let fixture: ComponentFixture<AlertComponent>;

describe('AlertComponent of shared module', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AlertComponent],
      providers: [
        {provide: AlertService, useValue: {}}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AlertComponent);
        comp = fixture.componentInstance;
      });
  }));

  it('should initialized component', () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });
});
