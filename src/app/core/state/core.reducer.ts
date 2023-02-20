import {createReducer, on} from '@ngrx/store';
import * as CoreApiActions from './core.api-actions';
import {UserDto} from '../../shared/model/user-dto';

export interface CoreState {
  loggedUser: UserDto,
  error: string
}

const initialState: CoreState = {
  loggedUser: JSON.parse(localStorage.getItem('user')),
  error: null
};

export const coreReducer = createReducer<CoreState>(
  initialState,
  on(CoreApiActions.loginUserSuccessAction, (state, action): CoreState => {
    return {
      ...state,
      loggedUser: action.user
    };
  }),
  on(CoreApiActions.loginUserFailureAction, (state, action): CoreState => {
    return {
      ...state,
      loggedUser: null,
      error: action.error
    };
  }),
  on(CoreApiActions.logoutUserSuccessAction, (state): CoreState => {
    return {
      ...state,
      loggedUser: null
    };
  }),
  on(CoreApiActions.logoutUserFailureAction, (state, action): CoreState => {
    return {
      ...state,
      error: action.error
    };
  })
);