import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as AppState from '../../app.state'
import {UserState} from './user.reducer';

export interface State extends AppState.BaseState {
  user: UserState;
}

const userFeatureSelector = createFeatureSelector<UserState>('user');

export const loggedUserSelector = createSelector(
  userFeatureSelector,
  state => state.loggedUser
);

export const changePasswordErrorSelector = createSelector(
  userFeatureSelector,
  state => state.changePasswordError
);

export const portfolioSelector = createSelector(
  userFeatureSelector,
  state => state.portfolio
);

export const registerUserErrorSelector = createSelector(
  userFeatureSelector,
  state => state.registerError
);