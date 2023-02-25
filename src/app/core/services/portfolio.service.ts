import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {PortfolioDto} from '../../shared/model/portfolio-dto';
import {tap} from 'rxjs/operators';
import {LoggedUserDto} from '../../shared/model/logged-user-dto';
import {CustomHeaders} from '../../auth/enum/custom-headers.enum';
import {HttpEncodingType} from '../../shared/model/http.enum';

@Injectable()
export class PortfolioService {
  private readonly versionedPortfolioHost = environment.apiUrl + '/main/portfolio/v1';

  constructor(private http: HttpClient) {
  }

  public updateAvatar(portfolioForm: FormData): Observable<PortfolioDto> {
    return this.http.post<PortfolioDto>(`${this.versionedPortfolioHost}/avatar`, portfolioForm,
      {headers: new HttpHeaders()
          .set(CustomHeaders.CONTENT_ENCODING, HttpEncodingType.NONE), observe: `body`})
      .pipe(
        tap((response: PortfolioDto) => {
          const user: LoggedUserDto = JSON.parse(localStorage.getItem('user'));
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }
}
