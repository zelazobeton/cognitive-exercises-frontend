import {createAction, props} from '@ngrx/store';
import {LoggedUserDto} from '../../shared/model/logged-user-dto';
import {PortfolioDto} from '../../shared/model/portfolio-dto';

export const loginUserSuccessAction = createAction(
  '[User API] user login success',
  props<{ user: LoggedUserDto }>()
);

export const loginUserFailureAction = createAction(
  '[User API] user login failed',
  props<{ error: string }>()
);

export const logoutUserSuccessAction = createAction(
  '[User API] user logout success'
);

export const logoutUserFailureAction = createAction(
  '[User API] user logout failed',
  props<{ error: string }>()
);

export const changePasswordSuccessAction = createAction(
  '[User API] change password success'
);

export const changePasswordFailureAction = createAction(
  '[User API] change password failed',
  props<{ error: string }>()
);

export const getUserPortfolioSuccessAction = createAction(
  '[User API] get user profile success',
  props<PortfolioDto>()
);

export const getUserPortfolioFailureAction = createAction(
  '[User API] get user profile failed'
);

export const updateAvatarSuccessAction = createAction(
  '[User API] update avatar success',
  props<PortfolioDto>()
);

export const updateAvatarFailureAction = createAction(
  '[User API] update avatar failed'
);

export const registerUserSuccessAction = createAction(
  '[User API] register user success'
);

export const registerUserFailureAction = createAction(
  '[User API] register user failed',
  props<{ error: string }>()
);

export const resetPasswordSuccessAction = createAction(
  '[User API] reset password success'
);

export const resetPasswordFailureAction = createAction(
  '[User API] reset password failed'
);
