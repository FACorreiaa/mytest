import { Action } from '@ngrx/store'
import { ManageBusinessData, BusinessUnitManageResponse, BaseServiceResponse, LocationData } from '@app/api/models/api-models'

export enum AuthActionTypes {
  MANAGE_BUSINESS_ATTEMPT = '[Auth] Manaege Business Attempt',
  MANAGE_BUSINESS_FAILURE = '[Auth] Manaege Business Failure',
  MANAGE_BUSINESS_SUCCESS = '[Auth] Manaege Business Success',

  REQUEST_ADMIN_RIGHTS_ATTEMPT = '[Auth] Request Admin Rights Attempt',
  REQUEST_ADMIN_RIGHTS_FAILURE = '[Auth] Request Admin Rights Failure',
  REQUEST_ADMIN_RIGHTS_SUCCESS = '[Auth] Request Admin Rights Success',

  RESTAURANT_ASSISTENT_ATTEMPT = '[Restaurant] Restaurant Assistance Attempt',
  RESTAURANT_ASSISTENT_FAILURE = '[Restaurant] Restaurant Assistance Failure',
  RESTAURANT_ASSISTENT_SUCCESS = '[Restaurant] Restaurant Assistance Success',
  ERROR_LAYOUT_SHOW = '[Error] show',
  ERROR_LAYOUT_HIDE = '[Error] hide',
  NAV_MENU_LAYOUT_SHOW = '[NavMenu] show',
  NAV_MENU_LAYOUT_HIDE = '[NavMenu] hide',
  CHANGE_LANGUAGE = '[Auth] Change Language',
}

export class ManageBusinessAttempt implements Action {
  readonly type = AuthActionTypes.MANAGE_BUSINESS_ATTEMPT
  constructor(public payload: ManageBusinessData) {}
}

export class ManageBusinessSuccess implements Action {
  readonly type = AuthActionTypes.MANAGE_BUSINESS_SUCCESS
  constructor(public payload: { manageResponse: BusinessUnitManageResponse }) {}
}

export class ManageBusinessFailure implements Action {
  readonly type = AuthActionTypes.MANAGE_BUSINESS_FAILURE
  constructor(public payload: any) {}
}

export class RequestAdminRightsAttempt implements Action {
  readonly type = AuthActionTypes.REQUEST_ADMIN_RIGHTS_ATTEMPT
  constructor(public payload: LocationData) {}
}

export class RequestAdminRightsFailure implements Action {
  readonly type = AuthActionTypes.REQUEST_ADMIN_RIGHTS_FAILURE
  constructor(public payload: any) {}
}

export class RequestAdminRightsSuccess implements Action {
  readonly type = AuthActionTypes.REQUEST_ADMIN_RIGHTS_SUCCESS
  constructor(public payload: any) {}
}

export class RestaurantAssistentAttempt implements Action {
  readonly type = AuthActionTypes.RESTAURANT_ASSISTENT_ATTEMPT
  constructor(public payload?: any) {}
}

export class RestaurantAssistentSuccess implements Action {
  readonly type = AuthActionTypes.RESTAURANT_ASSISTENT_SUCCESS
  constructor(public payload: { restaurant: IHydraRestaurant }) {}
}

export class RestaurantAssistentFailure implements Action {
  readonly type = AuthActionTypes.RESTAURANT_ASSISTENT_FAILURE
  constructor(public payload: any) {}
}

export class ErrorLayoutShow implements Action {
  readonly type = AuthActionTypes.ERROR_LAYOUT_SHOW
  constructor(public payload: { error: any }) {}
}

export class ErrorLayoutHide implements Action {
  readonly type = AuthActionTypes.ERROR_LAYOUT_HIDE
  constructor(public payload: any) {}
}

export class NavMenuLayoutShow implements Action {
  readonly type = AuthActionTypes.NAV_MENU_LAYOUT_SHOW
  constructor() {}
}

export class NavMenuLayoutHide implements Action {
  readonly type = AuthActionTypes.NAV_MENU_LAYOUT_HIDE
  constructor() {}
}

export class ChangeLanguage implements Action {
  readonly type = AuthActionTypes.CHANGE_LANGUAGE
  constructor(public payload: any) {}
}

export type AuthActions =
  | ManageBusinessAttempt
  | ManageBusinessSuccess
  | ManageBusinessFailure
  | RequestAdminRightsAttempt
  | RequestAdminRightsFailure
  | RequestAdminRightsSuccess
  | RestaurantAssistentAttempt
  | RestaurantAssistentSuccess
  | RestaurantAssistentFailure
  | ErrorLayoutShow
  | ErrorLayoutHide
  | NavMenuLayoutShow
  | NavMenuLayoutHide
  | ChangeLanguage
