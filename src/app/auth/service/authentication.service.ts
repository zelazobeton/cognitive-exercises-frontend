import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {LoggedUserDto} from '../../shared/model/logged-user-dto';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {AuthForm, RegisterForm} from '../../shared/model/input-forms';
import {catchError, map, tap} from 'rxjs/operators';
import {NotificationType} from '../../notification/notification-type.enum';
import {NotificationService} from '../../notification/notification.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthServerTokenForm} from './auth-server-token-form';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private readonly tokenKey = environment.storageTokenKey;
  private readonly refreshTokenKey = environment.storageRefreshTokenKey;
  readonly versionedHost = environment.apiUrl;
  private readonly versionedUserHost = environment.apiUrl + '/main/user/v1';
  readonly authorizationServerClientId = environment.authorizationServerClientId;
  readonly authHost = environment.authorizationServerUrl;
  private token: string;

  private static addUserToLocalStorage(user: LoggedUserDto): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  constructor(private http: HttpClient,
              private notificationService: NotificationService,
              private router: Router,
              private translate: TranslateService) {
  }

  public login(loginForm: AuthForm): Observable<LoggedUserDto> {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', this.authorizationServerClientId);
    body.set('username', loginForm.username);
    body.set('password', loginForm.password);

    return this.http.post<AuthServerTokenForm>(
      `${this.authHost}/token`, body.toString(), {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded'),
        observe: `response`
      })
      .pipe(
        map((response: HttpResponse<AuthServerTokenForm>) => {
          this.saveToken(response.body.access_token);
          this.saveRefreshToken(response.body.refresh_token);
          const loggedUser = new LoggedUserDto();
          loggedUser.username = loginForm.username;
          AuthenticationService.addUserToLocalStorage(loggedUser);
          return loggedUser;
        })
      );
  }

  public register(registerForm: RegisterForm): Observable<LoggedUserDto | HttpErrorResponse> {
    return this.http.post<LoggedUserDto | HttpErrorResponse>(
      `${this.versionedUserHost}/register`, registerForm, {observe: 'body'});
  }

  public logout(): Observable<HttpResponse<void>> {
    const body = new URLSearchParams();
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    body.set('refresh_token', refreshToken);
    body.set('client_id', this.authorizationServerClientId);
    return this.http.post<void>(
      `${this.authHost}/logout`, body.toString(), {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        observe: `response`
      })
      .pipe(
        catchError(errorRes => {
          this.notificationService.notify(NotificationType.ERROR,
            this.translate.instant('notifications.server error try again'));
          return throwError(errorRes);
        }),
        tap(() => {
          this.removeUserDataFromApp();
        })
      );
  }

  public removeUserDataFromApp() {
    this.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  public getToken(): string {
    if (this.token == null) {
      this.loadToken();
    }
    return this.token;
  }

  public refreshAccessToken(): Observable<string> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('client_id', this.authorizationServerClientId);
    body.set('refresh_token', refreshToken);

    return this.http.post<AuthServerTokenForm>(
      `${this.authHost}/token`, body.toString(), {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        observe: `response`
      })
      .pipe(
        catchError(errorRes => {
          this.sendErrorNotification(NotificationType.ERROR, errorRes.error.message);
          return throwError(errorRes);
        }),
        map(response => {
          this.saveToken(response.body.access_token);
          this.saveRefreshToken(response.body.refresh_token);
          return response.body.access_token;
        })
      );
  }

  public isUserLoggedIn(): boolean {
    if (this.token == null) {
      this.loadToken();
    }
    return this.token !== null;
  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, this.translate.instant('notifications.server error try again'));
    }
  }

  private saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private saveToken(token: string): void {
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
  }

  private loadToken(): void {
    this.token = localStorage.getItem(this.tokenKey);
  }
}
