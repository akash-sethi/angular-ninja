import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {UserService, Errors} from '../shared';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authType: String = '';
  title: String = '';
  authForm: FormGroup;
  errors: Errors = new Errors();
  isSubmit = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;

      this.title = this.authType === 'login' && 'Login' || 'Sign up';
    });
  }

  submitForm() {
    this.isSubmit = true;
    const data = this.authForm.value;
    this.userService.authUser(this.authType, data)
      .subscribe(
        res => this.router.navigateByUrl('/'),
        err => {
          this.errors = err;
          this.isSubmit = false;
        });
  }
}
