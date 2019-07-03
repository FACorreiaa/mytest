import { Action } from '@ngrx/store'
import { LocationData, RequestAdminRightsBusinessId, BusinessData } from '@app/api/models/api-models'

export enum ActionTypes {
  GET_BUSINESS_UNITS = '[GetBusinessUnits] Get All Business Units',
  GET_BUSINESS_UNITS_SUCCESS = '[GetBusinessUnits] Get All Business Units Success',
  GET_BUSINESS_UNITS_FAILURE = '[GetBusinessUnits] Get All Business Units Failure',

  REQUEST_ADMIN_RIGHTS_ATTEMPT = '[DashBoard] Request Admin Rights Attempt',
  REQUEST_ADMIN_RIGHTS_FAILURE = '[DashBoard] Request Admin Rights Failure',
  REQUEST_ADMIN_RIGHTS_SUCCESS = '[DashBoard] Request Admin Rights Success',

  OAUTH_TOKEN_ATTEMPT = '[DashBoard] Request Oauth tokens Attempt',
  OAUTH_TOKEN_FAILURE = '[DashBoard] Request Oauth tokens Failure',
  OAUTH_TOKEN_SUCCESS = '[DashBoard] Request Oauth tokens Success',

  ERROR_LAYOUT_SHOW = '[Dashboard Error] show',
  ERROR_LAYOUT_HIDE = '[Dashboard Error] hide',
}

/*--- Get all business ---*/
export class GetAllBusinessAction implements Action {
  public type = ActionTypes.GET_BUSINESS_UNITS
  constructor(public payload?: any) { }
}

export class GetAllBusinessSuccessAction implements Action {
  public type = ActionTypes.GET_BUSINESS_UNITS_SUCCESS
  constructor(public payload?: BusinessData[]) { }
}

export class GetAllBusinessFailureAction implements Action {
  public type = ActionTypes.GET_BUSINESS_UNITS_FAILURE
  constructor(public payload?: any) { }
}

/*--- Request admin rights ---*/
export class RequestAdminRightsAttempt implements Action {
  readonly type = ActionTypes.REQUEST_ADMIN_RIGHTS_ATTEMPT
  constructor(public payload: LocationData) { }
}

export class RequestAdminRightsFailure implements Action {
  readonly type = ActionTypes.REQUEST_ADMIN_RIGHTS_FAILURE
  constructor(public payload: any) { }
}

export class RequestAdminRightsSuccess implements Action {
  readonly type = ActionTypes.REQUEST_ADMIN_RIGHTS_SUCCESS
  constructor(public payload: any) { }
}

/*--- Oauth tokens ---*/
export class OauthAttempt implements Action {
  readonly type = ActionTypes.OAUTH_TOKEN_ATTEMPT
  constructor(public payload: { request: RequestAdminRightsBusinessId }) { }
}

export class OauthFailure implements Action {
  readonly type = ActionTypes.OAUTH_TOKEN_FAILURE
  constructor(public payload?: any) { }
}

export class OauthSuccess implements Action {
  readonly type = ActionTypes.OAUTH_TOKEN_SUCCESS
  constructor() { }
}

/*--- Error layout ---*/
export class ErrorLayoutShow implements Action {
  public type = ActionTypes.ERROR_LAYOUT_SHOW
  constructor(public payload: any) { }
}

export class ErrorLayoutHide implements Action {
  public type = ActionTypes.ERROR_LAYOUT_HIDE
  constructor(public payload: any) { }
}

export type ReviewAction =
  | GetAllBusinessAction
  | GetAllBusinessSuccessAction
  | GetAllBusinessFailureAction
  | RequestAdminRightsAttempt
  | RequestAdminRightsFailure
  | RequestAdminRightsSuccess
  | OauthAttempt
  | OauthFailure
  | OauthSuccess
  | ErrorLayoutShow
  | ErrorLayoutHide
