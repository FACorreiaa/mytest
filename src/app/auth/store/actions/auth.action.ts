import { Action } from '@ngrx/store'
import { ManageBusinessObject } from '@app/api/models/api-models'

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
  MANAGE_BUSINESS_ATTEMPT: '[Auth] Manaege Business Attempt',
  MANAGE_BUSINESS_FAILURE: '[Auth] Manaege Business Failure',
  MANAGE_BUSINESS_SUCCESS: '[Auth] Manaege Business Success',
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

export class ManageBusinessAttempt implements Action {
  public type = AuthActionTypes.MANAGE_BUSINESS_ATTEMPT
  constructor(public payload: any) {}
}

export class ManageBusinessSuccess implements Action {
  public type = AuthActionTypes.MANAGE_BUSINESS_SUCCESS
  constructor(public payload: any) {}
}

export class ManageBusinessFailure implements Action {
  public type = AuthActionTypes.MANAGE_BUSINESS_FAILURE
  constructor(public payload: any) {}
}

export type AuthActions =
  | LoginAttempt
  | LoginSuccess
  | LoginFailure
  | Logout
  | LogoutSuccess
  | LogoutFailure
  | RegisterAttempt
  | RegisterSuccess
  | RegisterFailure
  | ManageBusinessAttempt
  | ManageBusinessSuccess
  | ManageBusinessFailure
