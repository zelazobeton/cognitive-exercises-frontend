import {GameDataDto} from '../../shared/model/game-data-dto';
import {createReducer, on} from '@ngrx/store';
import * as HomeApiActions from './home.api-actions';
import {ScoreboardPageDto} from '../../shared/model/scoreboard-page-dto';

export interface HomeState {
  gamesData: GameDataDto[],
  getGamesError?: string
  scoreboardPage?: ScoreboardPageDto
}

const initialState: HomeState = {
  gamesData: []
};

export const homeReducer = createReducer<HomeState>(
  initialState,
  on(HomeApiActions.getGamesDataSuccessAction, (state, action): HomeState => {
    return {
      ...state,
      gamesData: action.gamesData
    };
  }),
  on(HomeApiActions.getGamesDataFailureAction, (state, action): HomeState => {
    return {
      ...state,
      getGamesError: action.error
    };
  }),
  on(HomeApiActions.getGamesDataFailureAction, (state, action): HomeState => {
    return {
      ...state,
      getGamesError: action.error
    };
  }),
  on(HomeApiActions.getScoreboardPageSuccessAction, (state, action): HomeState => {
    return {
      ...state,
      scoreboardPage: action.scoreboardPage
    };
  })
);
