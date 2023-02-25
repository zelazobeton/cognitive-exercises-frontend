import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthForm} from '../../shared/model/input-forms';
import {Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';
import {loginUserAction} from '../state/user.actions';
import {loggedUserSelector} from '../state/user.selectors';
import {UserState} from '../state/user.reducer';

@Component({
  selector: 'app-login-dropdown',
  templateUrl: './login-dropdown.component.html',
  styleUrls: ['./login-dropdown.component.css']
})
export class LoginDropdownComponent implements OnInit {
  public loginForm: FormGroup;
  public showLoading: boolean;

  constructor(private store: Store<UserState>) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
    this.showLoading = false;
  }

  onSubmit(): void {
    this.showLoading = true;
    const loginFormData: AuthForm = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.loginForm.reset();
    this.store.dispatch(loginUserAction({authForm: loginFormData}));
    this.store.select(loggedUserSelector).pipe(
      tap(() => this.showLoading = false)
    );
  }
}
