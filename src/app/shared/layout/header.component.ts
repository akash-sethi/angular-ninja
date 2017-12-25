import {Component, OnInit} from '@angular/core';
import {User} from '../models';
import {UserService} from '../services';
import {AlertService} from '../alert';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService,
              private alertService: AlertService) {
  }

  currentUser: User;

  logout() {
    this.alertService.success('success!!', true);
    this.userService.purgeAuth();
  }

  ngOnInit() {
    this.userService.currentUser
      .subscribe(userData => this.currentUser = userData);
  }
}
