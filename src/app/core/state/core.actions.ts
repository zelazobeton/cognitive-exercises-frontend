import {createAction, props} from '@ngrx/store';
import {AuthForm} from '../../shared/model/input-forms';

export const loginUserAction = createAction(
  '[User] login',
  props<AuthForm>()
);

export const logoutUserAction = createAction(
  '[User] logout'
);