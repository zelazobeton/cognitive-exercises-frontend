import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../auth/service/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthForm} from '../../shared/model/input-forms';
import {loginUserAction} from '../state/user.actions';
import {Store} from '@ngrx/store';
import {loggedUserSelector, State} from '../state/user.selectors';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public showLoading: boolean;

  constructor(private store: Store<State>, private router: Router, private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
    if (authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    }
    this.store.select(loggedUserSelector).pipe(
      tap(() => this.showLoading = false)
    );
  }

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
    this.store.dispatch(
      loginUserAction({authForm: loginFormData, redirectUrl: this.route.snapshot.queryParams.returnUrl || '/'}));
  }
}
