import {GameDataDto} from '../../shared/model/game-data-dto';
import {createReducer, on} from '@ngrx/store';
import * as HomeApiActions from './home.api-actions';

export interface HomeState {
  gamesData: GameDataDto[],
  getGamesError: string
}

const initialState: HomeState = {
  gamesData: [],
  getGamesError: ''
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
  })
);