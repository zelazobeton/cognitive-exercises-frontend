import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ChangePasswordForm} from '../../shared/model/input-forms';
import {UserService} from '../../core/services/user.service';
import {Observable} from 'rxjs';
import {changePasswordErrorSelector, State} from '../state/user.selectors';
import {Store} from '@ngrx/store';
import {changePasswordAction} from '../state/user.actions';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public loading: boolean;
  public error: string = null;
  public error$: Observable<string>;

  checkPasswords = (group: FormGroup) => {
    const passwordInput = group.controls.password;
    const passwordConfirmationInput = group.controls.passwordConfirmation;
    if (passwordInput.value === passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors(null);
    }
    passwordConfirmationInput.setErrors({notEquivalent: true});
  };

  constructor(private store: Store<State>, private router: Router, private userService: UserService,
              private formBuilder: FormBuilder) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
        oldPassword: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required]
      }, {validator: this.checkPasswords}
    );
    this.error$ = this.store.select(changePasswordErrorSelector);
  }

  onSubmit(): void {
    this.loading = true;
    const changePasswordForm: ChangePasswordForm = {
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.password,
    };
    this.changePasswordForm.reset();
    this.store.dispatch(changePasswordAction({changePasswordForm}));
    this.loading = false;
  }
}
