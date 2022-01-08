export interface AuthForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
}

export interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
}