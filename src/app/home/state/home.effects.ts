import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as HomePageActions from './home.actions';
import * as HomeApiActions from './home.api-actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {GamesService} from '../../core/services/games.service';
import {UserService} from '../../core/services/user.service';
import {NotificationType} from '../../notification/notification-type.enum';
import {NotificationService} from '../../notification/notification.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class HomeEffects {

  constructor(private actions$: Actions, private gamesService: GamesService, private userService: UserService,
              private notificationService: NotificationService,
              private translate: TranslateService,) {
  }

  getGamesData$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(HomePageActions.getGamesDataAction),
        mergeMap(() => this.gamesService.getGamesData()
          .pipe(
            map(gamesData => HomeApiActions.getGamesDataSuccessAction({gamesData})),
            catchError(error => of(HomeApiActions.getGamesDataFailureAction({error})))
          )
        )
      );
  });

  getScoreBoardPage$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(HomePageActions.getScoreBoardPageAction),
        mergeMap(({pageNum, pageSize}) => this.userService.fetchScoreboard(pageNum, pageSize)
          .pipe(
            map(scoreboardPage => HomeApiActions.getScoreboardPageSuccessAction({scoreboardPage})),
            catchError(error => {
              this.notificationService.notify(NotificationType.ERROR,
                this.translate.instant('notifications.something went wrong on our side'));
              return of(HomeApiActions.getScoreboardPageFailureAction());
            })
          )
        )
      );
  });
}
