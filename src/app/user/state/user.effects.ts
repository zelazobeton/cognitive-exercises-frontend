import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as UserActions from './user.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import * as UserApiActions from './user.api-actions';
import {AuthenticationService} from '../../auth/service/authentication.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {NotificationType} from '../../notification/notification-type.enum';
import {NotificationService} from '../../notification/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {PortfolioService} from '../../core/services/portfolio.service';
import {PortfolioDto} from '../../shared/model/portfolio-dto';
import {UserPortfolioDto} from '../../shared/model/user-portfolio-dto';
import {LoggedUserDto} from '../../shared/model/logged-user-dto';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userService: UserService,
              private authenticationService: AuthenticationService,
              private portfolioService: PortfolioService,
              private notificationService: NotificationService,
              private translate: TranslateService,
              private router: Router) {
  }

  loginUserData$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserActions.loginUserAction),
        mergeMap((action) => this.authenticationService.login(action.authForm)
          .pipe(
            map(user => {
              this.router.navigateByUrl(action.redirectUrl);
              return UserApiActions.loginUserSuccessAction({user})
            }),
            catchError(error => {
              this.notificationService.notify(NotificationType.ERROR,
                this.translate.instant('notifications.incorrect credentials'));
              return of(UserApiActions.loginUserFailureAction({error}))
            })
          )
        )
      );
  });

  logoutUserData$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserActions.logoutUserAction),
        mergeMap(() => this.authenticationService.logout()
          .pipe(
            map(() => {
              this.router.navigateByUrl('/');
              return UserApiActions.logoutUserSuccessAction()
            }),
            catchError(error => of(UserApiActions.logoutUserFailureAction({error})))
          )
        )
      );
  });

  changePassword$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserActions.changePasswordAction),
        mergeMap((action) => this.userService.changePassword(action.changePasswordForm)
          .pipe(
            map((res) => {
              this.notificationService.notify(NotificationType.SUCCESS,
                this.translate.instant('notifications.Password successfully changed.'));
              return UserApiActions.changePasswordSuccessAction();
            }),
            catchError(receivedError => {
              let error = null;
              if (receivedError.status === 406) {
                error = receivedError.error.message;
              } else {
                this.notificationService.notify(NotificationType.ERROR,
                  this.translate.instant('notifications.server error try again'));
              }
              return of(UserApiActions.changePasswordFailureAction({error}))
            })
          )
        )
      );
  });

  getPortfolio$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserActions.getUserPortfolioAction),
        mergeMap(() => this.userService.fetchUserData()
          .pipe(
            map((userPortfolio: UserPortfolioDto) => {
              return UserApiActions.getUserPortfolioSuccessAction(userPortfolio.portfolio);
            }),
            catchError(error => {
              this.notificationService.notify(NotificationType.ERROR,
                this.translate.instant('notifications.something went wrong on our side'));
              return of(UserApiActions.getUserPortfolioFailureAction());
            })
          )
        )
      );
  });

  updateAvatar$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserActions.updateAvatarAction),
        mergeMap((action) => {
          return this.portfolioService.updateAvatar(action.avatarForm)
          .pipe(
            map((portfolio: PortfolioDto) => {
              this.notificationService.notify(NotificationType.SUCCESS,
                this.translate.instant('notifications.Avatar updated'));
              return UserApiActions.updateAvatarSuccessAction(portfolio);
            }),
            catchError(error => {
              this.notificationService.notify(NotificationType.ERROR,
                this.translate.instant('notifications.something went wrong on our side'));
              return of(UserApiActions.updateAvatarFailureAction());
            })
          )}
        )
      );
  });

  registerUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserActions.registerUserAction),
        mergeMap((action) => this.authenticationService.register(action.registerForm)
          .pipe(
            map((response: LoggedUserDto) => {
              this.notificationService.notify(NotificationType.SUCCESS,
                this.translate.instant('notifications.A new account was created for', {username: response.username})
              );
              return UserApiActions.registerUserSuccessAction();
            }),
            catchError(error => of(UserApiActions.registerUserFailureAction(error)))
          )
        )
      );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserActions.resetPasswordAction),
        mergeMap((action) => this.userService.resetPassword(action.email)
          .pipe(
            map((response) => {
              this.notificationService.notify(NotificationType.SUCCESS, response.message);
              return UserApiActions.resetPasswordSuccessAction();
            }),
            catchError(error => {
              this.notificationService.notify(NotificationType.ERROR, error.error.message);
              return of(UserApiActions.resetPasswordFailureAction());
            })
          )
        )
      );
  });
}