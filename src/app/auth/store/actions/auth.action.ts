import { Action } from '@ngrx/store'
import { UserRegisterDto, ManageBusinessData } from '@app/api/models/api-models'

export const AuthActionTypes = {
  MANAGE_BUSINESS_ATTEMPT: '[Auth] Manaege Business Attempt',
  MANAGE_BUSINESS_FAILURE: '[Auth] Manaege Business Failure',
  MANAGE_BUSINESS_SUCCESS: '[Auth] Manaege Business Success',
  ERROR_LAYOUT_SHOW: '[Error] show',
  ERROR_LAYOUT_HIDE: '[Error] hide',
  CHANGE_LANGUAGE: '[Auth] Change Language',
}

export class ManageBusinessAttempt implements Action {
  public type = AuthActionTypes.MANAGE_BUSINESS_ATTEMPT
  constructor(public payload: ManageBusinessData) {}
}

export class ManageBusinessSuccess implements Action {
  public type = AuthActionTypes.MANAGE_BUSINESS_SUCCESS
  constructor(public payload: any) {}
}

export class ManageBusinessFailure implements Action {
  public type = AuthActionTypes.MANAGE_BUSINESS_FAILURE
  constructor(public payload: any) {}
}

export class ErrorLayoutShow implements Action {
  public type = AuthActionTypes.ERROR_LAYOUT_SHOW
  constructor(public payload: any) {}
}

export class ErrorLayoutHide implements Action {
  public type = AuthActionTypes.ERROR_LAYOUT_HIDE
  constructor(public payload: any) {}
}

export class ChangeLanguage implements Action {
  public type = AuthActionTypes.CHANGE_LANGUAGE
  constructor(public payload: any) {}
}

export type AuthActions = ManageBusinessAttempt | ManageBusinessSuccess | ManageBusinessFailure | ErrorLayoutShow | ErrorLayoutHide | ChangeLanguage
