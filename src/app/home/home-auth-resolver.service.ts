import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {UserService} from '../shared';

/**
 * This service check if user is authenticated and return boolean and allow access to home page if user is authenticated.
 */
@Injectable()
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(private router: Router,
              private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<boolean> {

    return this.userService.isAuthenticated.take(1).map(user => user);
  }
}
