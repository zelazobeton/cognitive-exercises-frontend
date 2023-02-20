import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as CoreActions from './core.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import * as CoreApiActions from './core.api-actions';
import {AuthenticationService} from '../../auth/service/authentication.service';
import {AuthForm} from '../../shared/model/input-forms';
import {of} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class CoreEffects {

  constructor(private actions$: Actions, private authenticationService: AuthenticationService, private router: Router) {
  }

  loginUserData$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CoreActions.loginUserAction),
        mergeMap((loginFormData: AuthForm) => this.authenticationService.login(loginFormData)
          .pipe(
            map(user => CoreApiActions.loginUserSuccessAction({user})),
            catchError(error => of(CoreApiActions.loginUserFailureAction({error})))
          )
        )
      );
  });

  logoutUserData$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CoreActions.logoutUserAction),
        mergeMap(() => this.authenticationService.logout()
          .pipe(
            map(() => {
              this.router.navigateByUrl('/');
              return CoreApiActions.logoutUserSuccessAction()
            }),
            catchError(error => of(CoreApiActions.logoutUserFailureAction({error})))
          )
        )
      );
  });
}