import {createFeatureSelector, createSelector} from '@ngrx/store';
import {HomeState} from './home.reducer';

const homeFeatureState = createFeatureSelector<HomeState>('home');

export const gamesDataSelector = createSelector(
  homeFeatureState,
  state => state.gamesData
);

export const gamesDataErrorSelector = createSelector(
  homeFeatureState,
  state => state.getGamesError
);