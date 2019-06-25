import { Action } from '@ngrx/store'
import { FetchVerificationRequest, LocationData, RequestAdminRightsBusinessId, BusinessData } from '@app/api/models/api-models'

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

  FETCH_VERIFICATION_OPTIONS = '[FetchVerificationOptions] Fetch Verification Options',
  FETCH_VERIFICATION_OPTIONS_SUCCESS = '[FetchVerificationOptions] Fetch Verification Options Success',
  FETCH_VERIFICATION_OPTIONS_FAILURE = '[FetchVerificationOptions] Fetch Verification Options Failure',

  INIT_VERIFICATION = '[InitVerification] Init Verification',
  INIT_VERIFICATION_SUCCESS = '[InitVerification] Init Verification Success',
  INIT_VERIFICATION_FAILURE = '[InitVerification] Init Verification Failure',

  COMPLETE_VERIFICATION = '[CompleteVerification] Complete Verification',
  COMPLETE_VERIFICATION_SUCCESS = '[CompleteVerification] Complete Verification Success',
  COMPLETE_VERIFICATION_FAILURE = '[CompleteVerification] Complete Verification Failure',

  ERROR_LAYOUT_SHOW = '[Dashboard Error] show',
  ERROR_LAYOUT_HIDE = '[Dashboard Error] hide',
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
  constructor(public payload: LocationData) {}
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
  constructor(public payload?: any) {}
}

export class OauthSuccess implements Action {
  readonly type = ActionTypes.OAUTH_TOKEN_SUCCESS
  constructor() {}
}

/*--- Fetch verifications ---*/
export class FetchVerificationOptions implements Action {
  public type = ActionTypes.FETCH_VERIFICATION_OPTIONS
  constructor(public id: number, public payload?: FetchVerificationRequest) {}
}

export class FetchVerificationOptionsSuccess implements Action {
  public type = ActionTypes.FETCH_VERIFICATION_OPTIONS_SUCCESS
  constructor(public payload?: any) {}
}

export class FetchVerificationOptionsFailure implements Action {
  public type = ActionTypes.FETCH_VERIFICATION_OPTIONS_FAILURE
  constructor(public payload?: any) {}
}

/*--- Init verifications ---*/
export class InitVerification implements Action {
  public type = ActionTypes.INIT_VERIFICATION
  constructor(public id: number, public payload?: any) {}
}

export class InitVerificationSuccess implements Action {
  public type = ActionTypes.INIT_VERIFICATION_SUCCESS
  constructor(public payload?: any) {}
}

export class InitVerificationFailure implements Action {
  public type = ActionTypes.INIT_VERIFICATION_FAILURE
  constructor(public payload?: any) {}
}

/*--- Complete verifications ---*/
export class CompleteVerification implements Action {
  public type = ActionTypes.COMPLETE_VERIFICATION
  constructor(public id: number, public payload?: any) {}
}

export class CompleteVerificationSuccess implements Action {
  public type = ActionTypes.COMPLETE_VERIFICATION_SUCCESS
  constructor(public payload?: any) {}
}

export class CompleteVerificationFailure implements Action {
  public type = ActionTypes.COMPLETE_VERIFICATION_FAILURE
  constructor(public payload?: any) {}
}

/*--- Error layout ---*/
export class ErrorLayoutShow implements Action {
  public type = ActionTypes.ERROR_LAYOUT_SHOW
  constructor(public payload: any) {}
}

export class ErrorLayoutHide implements Action {
  public type = ActionTypes.ERROR_LAYOUT_HIDE
  constructor(public payload: any) {}
}

export type DashBoardAction =
  | GetAllBusinessAction
  | GetAllBusinessSuccessAction
  | GetAllBusinessFailureAction
  | RequestAdminRightsAttempt
  | RequestAdminRightsFailure
  | RequestAdminRightsSuccess
  | OauthAttempt
  | OauthFailure
  | OauthSuccess
  | FetchVerificationOptions
  | FetchVerificationOptionsSuccess
  | FetchVerificationOptionsFailure
  | InitVerification
  | InitVerificationSuccess
  | InitVerificationFailure
  | CompleteVerification
  | CompleteVerificationSuccess
  | CompleteVerificationFailure
  | ErrorLayoutShow
  | ErrorLayoutHide
