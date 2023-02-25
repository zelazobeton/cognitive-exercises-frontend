import {createFeatureSelector, createSelector} from '@ngrx/store';
import {HomeState} from './home.reducer';
import * as AppState from '../../app.state';

export interface State extends AppState.BaseState {
  home: HomeState;
}

const homeFeatureSelector = createFeatureSelector<HomeState>('home');

export const gamesDataSelector = createSelector(
  homeFeatureSelector,
  state => state.gamesData
);

export const gamesDataErrorSelector = createSelector(
  homeFeatureSelector,
  state => state.getGamesError
);

export const scoreBoardPageSelector = createSelector(
  homeFeatureSelector,
  state => state.scoreboardPage
);