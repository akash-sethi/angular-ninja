import {Injectable} from '@angular/core';
import {JwtService} from './jwt.service';
import {ApiService} from './api.service';
import * as JWT from 'jwt-decode';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {User} from '../models/user.model';
import {Router} from '@angular/router';
import {AlertService} from '../alert/alert.service';

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private jwtService: JwtService,
              private apiService: ApiService,
              private router: Router,
              private alertService: AlertService) {
  }

  populateUser() {
    if (this.jwtService.getToken()) {
      this.setAuth(this.jwtService.getToken());
    } else {
      this.purgeAuth();
    }
  }

  setAuth(token) {
    const userData = JWT(token);
    const user = new User();
    this.jwtService.setToken(token);
    user.email = userData['email'];
    user.token = userData['token'];
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth(message?: string) {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
    if (message) {
      this.alertService.error(message, true);
    }
    this.router.navigateByUrl('/login');
  }

  authUser(type, data): Observable<User> {
    const route = type === 'login' && '/auth' || '/signup';
    return this.apiService.post('/user' + route, {credentials: data})
      .map(
        res => {
          this.setAuth(res.user.token);
          return res;
        }
      );
  }

  checkCvv(data: {}): Observable<any> {
    return this.apiService.post('/cvv/log', data);
  }

}
