import {createAction, props} from '@ngrx/store';
import {AuthForm, ChangePasswordForm, RegisterForm} from '../../shared/model/input-forms';

export const loginUserAction = createAction(
  '[User] login',
  props<{authForm: AuthForm, redirectUrl?: string}>()
);

export const logoutUserAction = createAction(
  '[User] logout'
);

export const changePasswordAction = createAction(
  '[User] change password',
  props<{changePasswordForm: ChangePasswordForm}>()
);

export const getUserPortfolioAction = createAction(
  '[User] get profile'
);

export const updateAvatarAction = createAction(
  '[User] update avatar',
  props<{avatarForm: FormData}>()
);

export const registerUserAction = createAction(
  '[User] register user',
  props<{registerForm: RegisterForm}>()
);

export const resetPasswordAction = createAction(
  '[User] reset password',
  props<{email: string}>()
);
