import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoreState} from './core.reducer';
import * as AppState from '../../app.state'

export interface State extends AppState.BaseState {
  core: CoreState;
}

const coreFeatureSelector = createFeatureSelector<CoreState>('core');

export const loggedUserSelector = createSelector(
  coreFeatureSelector,
  state => state.loggedUser
);
