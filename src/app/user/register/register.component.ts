import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../auth/service/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterForm} from '../../shared/model/input-forms';
import {UserState} from '../state/user.reducer';
import {Store} from '@ngrx/store';
import {registerUserAction} from '../state/user.actions';
import {registerUserErrorSelector} from '../state/user.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public showLoading: boolean;
  public registerUserError$: Observable<string>;
  public formErrors = [];

  onValueChange() {
    this.formErrors = [];
    if (this.formControls.username.errors == null) {
      return;
    }
    if ('pattern' in this.formControls.username.errors) {
      this.formErrors.push('Username can contain only letters, digits and special signs: .@');
    }
    if ('maxlength' in this.formControls.username.errors) {
      this.formErrors.push('Max username length is 50 chars');
    }
    if (this.formControls.email.invalid && this.formControls.email.dirty && this.formControls.email.value !== '') {
      this.formErrors.push('Please enter a valid email address');
    }
  }

  constructor(private store: Store<UserState>, private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    }
    this.registerUserError$ = this.store.select(registerUserErrorSelector);
    this.registerForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required, Validators.pattern('^[a-zA-Z0-9@.]+'), Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  public onSubmit(): void {
    this.showLoading = true;
    const registerForm: RegisterForm = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email
    };
    this.registerForm.reset();
    this.store.dispatch(registerUserAction({registerForm}));
    this.showLoading = false;
  }

  get formControls() {
    return this.registerForm.controls;
  }
}
