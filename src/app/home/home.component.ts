import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Errors} from '../shared';
import {UserService, AlertService} from '../shared';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Security Number';
  securityForm: FormGroup;
  isSubmitting = false;
  errors: Errors = new Errors();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private alertService: AlertService,
              private datePipe: DatePipe) {
    this.route.data.subscribe(user => {
      if (!user.isAuthenticated) {
        this.alertService.info('You are not authorized. Please Login.', true);
        this.router.navigateByUrl('/login');
      } else {
        this.alertService.success('Welcome Ninja');
      }
    });
    this.securityForm = fb.group({
      cvv: ['', [Validators.required, Validators.min(100), Validators.max(999), Validators.maxLength(3)]]
    });
  }

  ngOnInit() {
  }

  /**
   * This is a helper method for handling errors.
   * @param err
   */
  private handleError = (err) => {
    const error = err.errors;
    if (err.statusCode === 401) {
      this.userService.purgeAuth(error.message);
    } else {
      const message = `Log time: ${this.datePipe.transform(error.logTime, 'yyyy-MM-dd HH:mm:ss')}, Message: ${error.message}`;
      this.alertService.error(message);
    }
  }

  /**
   * This method takes data from form and make an post call using API service and display success or error message based on api response.
   */
  submitForm() {
    const data = this.securityForm.value;
    this.userService.checkCvv(data)
      .subscribe(res => {
        if (res.status === 'success') {
          this.alertService.success(res.message);
        } else {
          this.handleError(res);
        }
      }, err => this.handleError(err.error));
  }
}
