import {createFeatureSelector, createSelector} from '@ngrx/store';
import {HomeState} from './home.reducer';
import * as AppState from '../../app.state';
import {CoreState} from '../../core/state/core.reducer';

export interface State extends AppState.BaseState {
  core: CoreState;
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