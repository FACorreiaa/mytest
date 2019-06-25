import { Action } from '@ngrx/store'
import { LocationData, BusinessData, RequestAdminRightsBusinessId } from '@app/api/models/api-models'

export enum ActionTypes {
  GET_BUSINESS_UNITS = '[Google] Get All Business Units',
  GET_BUSINESS_UNITS_SUCCESS = '[Google] Get All Business Units Success',
  GET_BUSINESS_UNITS_FAILURE = '[Google] Get All Business Units Failure',

  REQUEST_ADMIN_RIGHTS_ATTEMPT = '[Google] Request Admin Rights Attempt',
  REQUEST_ADMIN_RIGHTS_FAILURE = '[Google] Request Admin Rights Failure',
  REQUEST_ADMIN_RIGHTS_SUCCESS = '[Google] Request Admin Rights Success',

  OAUTH_TOKEN_ATTEMPT = '[Google] Request Oauth tokens Attempt',
  OAUTH_TOKEN_FAILURE = '[Google] Request Oauth tokens Failure',
  OAUTH_TOKEN_SUCCESS = '[Google] Request Oauth tokens Success',
}

/*--- Get all business ---*/
export class GetAllBusinessAction implements Action {
  public type = ActionTypes.GET_BUSINESS_UNITS
  constructor(public payload?: any) {}
}

export class GetAllBusinessSuccessAction implements Action {
  public type = ActionTypes.GET_BUSINESS_UNITS_SUCCESS
  constructor(public payload?: BusinessData[]) {}
}

export class GetAllBusinessFailureAction implements Action {
  public type = ActionTypes.GET_BUSINESS_UNITS_FAILURE
  constructor(public payload?: any) {}
}

/*--- Request admin rights ---*/
export class RequestAdminRightsAttempt implements Action {
  readonly type = ActionTypes.REQUEST_ADMIN_RIGHTS_ATTEMPT
  constructor(public payload: RequestAdminRightsBusinessId) {}
}

export class RequestAdminRightsFailure implements Action {
  readonly type = ActionTypes.REQUEST_ADMIN_RIGHTS_FAILURE
  constructor(public payload: any) {}
}

export class RequestAdminRightsSuccess implements Action {
  readonly type = ActionTypes.REQUEST_ADMIN_RIGHTS_SUCCESS
  constructor(public payload: any) {}
}

/*--- Oauth tokens ---*/

export class OauthAttempt implements Action {
  readonly type = ActionTypes.OAUTH_TOKEN_ATTEMPT
  constructor(public payload: { request: RequestAdminRightsBusinessId }) {}
}

export class OauthFailure implements Action {
  readonly type = ActionTypes.OAUTH_TOKEN_FAILURE
  constructor(public payload?: { businessUnitId: number }) {}
}

export class OauthSuccess implements Action {
  readonly type = ActionTypes.OAUTH_TOKEN_SUCCESS
  constructor() {}
}

export type GoogleAction =
  | GetAllBusinessAction
  | GetAllBusinessSuccessAction
  | GetAllBusinessFailureAction
  | RequestAdminRightsAttempt
  | RequestAdminRightsFailure
  | RequestAdminRightsSuccess
  | OauthAttempt
  | OauthFailure
  | OauthSuccess
