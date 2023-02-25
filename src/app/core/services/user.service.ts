import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {CustomHttpResponse} from '../../shared/model/custom-http-response';
import {ChangePasswordForm} from '../../shared/model/input-forms';
import {ScoreboardPageDto} from '../../shared/model/scoreboard-page-dto';
import {UserPortfolioDto} from '../../shared/model/user-portfolio-dto';

@Injectable()
export class UserService {
  private readonly versionedUserHost = environment.apiUrl + '/main/user/v1';
  private readonly versionedPortfolioHost = environment.apiUrl + '/main/portfolio/v1';

  constructor(private http: HttpClient) {
  }

  public changePassword(changePasswordForm: ChangePasswordForm) {
    return this.http.post<HttpResponse<string> | HttpErrorResponse>(
      `${this.versionedUserHost}/password`, changePasswordForm, {observe: 'body'});
  }

  public resetPassword(email: string): Observable<CustomHttpResponse> {
    return this.http.post<CustomHttpResponse>(`${this.versionedUserHost}/reset-password`, email);
  }

  public fetchUserData(): Observable<UserPortfolioDto> {
    return this.http.get<UserPortfolioDto>(`${this.versionedUserHost}`);
  }

  public fetchScoreboard(pageNum: number, pageSize: number): Observable<ScoreboardPageDto> {
    return this.http.get<ScoreboardPageDto>(
      `${this.versionedPortfolioHost}/scoreboard`,
      {params: {page: pageNum.toString(), size: pageSize.toString()}});
  }
}
