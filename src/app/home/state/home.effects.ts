import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as HomePageActions from './home.actions';
import * as HomeApiActions from './home.api-actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {GamesService} from '../../core/services/games.service';

@Injectable()
export class HomeEffects {

  constructor(private actions$: Actions, private gamesService: GamesService) {
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
}