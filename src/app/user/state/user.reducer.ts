import {createReducer, on} from '@ngrx/store';
import * as UserApiActions from './user.api-actions';
import {LoggedUserDto} from '../../shared/model/logged-user-dto';
import {PortfolioDto} from '../../shared/model/portfolio-dto';

export interface UserState {
  loggedUser: LoggedUserDto,
  loginError?: string,
  changePasswordError?: string,
  portfolio?: PortfolioDto,
  registerError?: string
}

const initialState: UserState = {
  loggedUser: JSON.parse(localStorage.getItem('user'))
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserApiActions.loginUserSuccessAction, (state, action): UserState => {
    return {
      ...state,
      loggedUser: action.user
    };
  }),
  on(UserApiActions.loginUserFailureAction, (state, action): UserState => {
    return {
      ...state,
      loggedUser: null,
      loginError: action.error
    };
  }),
  on(UserApiActions.logoutUserSuccessAction, (state): UserState => {
    return {
      ...state,
      loggedUser: null
    };
  }),
  on(UserApiActions.logoutUserFailureAction, (state, action): UserState => {
    return {
      ...state,
      loginError: action.error
    };
  }),
  on(UserApiActions.changePasswordSuccessAction, (state): UserState => {
    return {
      ...state,
      changePasswordError: null
    };
  }),
  on(UserApiActions.changePasswordFailureAction, (state, action): UserState => {
    return {
      ...state,
      changePasswordError: action.error
    };
  }),
  on(UserApiActions.getUserPortfolioSuccessAction, (state, action): UserState => {
    return {
      ...state,
      portfolio: action
    };
  }),
  on(UserApiActions.updateAvatarSuccessAction, (state, action): UserState => {
    return {
      ...state,
      portfolio: action
    };
  }),
  on(UserApiActions.registerUserFailureAction, (state, action): UserState => {
    return {
      ...state,
      registerError: action.error
    };
  })
);