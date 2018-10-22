import { Action } from '@ngrx/store'

export const AuthActionTypes = {
  LOGIN_SUCCESS: '[Auth] Login Success',
  LOGIN_FAILURE: '[Auth] Login Failure',
  LOGIN_ATTEMPT: '[Auth] Login Attempt',
  LOGOUT: '[Auth] Logout',
  LOGOUT_SUCCESS: '[Auth] Logout Success',
  LOGOUT_FAILURE: '[Auth] Logout Failure',
  REGISTER_SUCCESS: '[Auth] Register Success',
  REGISTER_FAILURE: '[Auth] Register Failure',
  REGISTER_ATTEMPT: '[Auth] Register Attempt',
}

export class LoginAttempt implements Action {
  public type = AuthActionTypes.LOGIN_ATTEMPT
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccess implements Action {
  public type = AuthActionTypes.LOGIN_SUCCESS
  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  public type = AuthActionTypes.LOGIN_FAILURE
  constructor(public payload: any) {}
}

export class Logout implements Action {
  public type = AuthActionTypes.LOGOUT
  constructor(public payload: any) {}
}

export class LogoutSuccess implements Action {
  public type = AuthActionTypes.LOGOUT_SUCCESS
  constructor(public payload: any) {}
}

export class LogoutFailure implements Action {
  public type = AuthActionTypes.LOGOUT_FAILURE
  constructor(public payload: any) {}
}

export class RegisterAttempt implements Action {
  public type = AuthActionTypes.REGISTER_ATTEMPT
  constructor(public payload: { email: string; password: string }) {}
}

export class RegisterSuccess implements Action {
  public type = AuthActionTypes.REGISTER_SUCCESS
  constructor(public payload: any) {}
}

export class RegisterFailure implements Action {
  public type = AuthActionTypes.REGISTER_FAILURE
  constructor(public payload: any) {}
}

export type AuthActions = LoginAttempt | LoginSuccess | LoginFailure | Logout | LogoutSuccess | LogoutFailure | RegisterAttempt | RegisterSuccess | RegisterFailure
