import {createAction, props} from '@ngrx/store';
import {UserDto} from '../../shared/model/user-dto';

export const loginUserSuccessAction = createAction(
  '[User API] user login success',
  props<{ user: UserDto }>()
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
