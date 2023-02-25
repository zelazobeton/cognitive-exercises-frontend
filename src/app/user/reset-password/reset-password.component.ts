import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../core/services/user.service';
import {AuthenticationService} from '../../auth/service/authentication.service';
import {UserState} from '../state/user.reducer';
import {Store} from '@ngrx/store';
import {resetPasswordAction} from '../state/user.actions';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public showLoading: boolean;
  public emailInputInvalid = false;

  showEmailInvalidError() {
    this.emailInputInvalid = this.formControls.email.invalid && this.formControls.email.dirty && this.formControls.email.value !== '';
  }

  constructor(private store: Store<UserState>, private router: Router, private userService: UserService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    }
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  public onSubmit(): void {
    this.showLoading = true;
    this.store.dispatch(resetPasswordAction({email: this.resetPasswordForm.value.email}));
    this.showLoading = false;
  }

  get formControls() {
    return this.resetPasswordForm.controls;
  }
}
