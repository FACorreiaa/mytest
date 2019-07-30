import { Action } from '@ngrx/store'
import { TermsConditionsPostRequest, BootstrapResponse, TermsAndConditions, BusinessData } from '@app/api/models/api-models'
import { HttpErrorResponse } from '@angular/common/http'

export enum TermsActionTypes {
  TERMS_CONDITIONS_ATTEMPT = '[TermsConditions] Terms Conditions Attempt',
  TERMS_CONDITIONS_FAILURE = '[TermsConditions] Terms Conditions Failure',
  TERMS_CONDITIONS_SUCCESS = '[TermsConditions] Terms Conditions Success',

  GET_BUSINESS_UNITS = '[TermsConditions] Get All Business Units',
  GET_BUSINESS_UNITS_SUCCESS = '[TermsConditions] Get All Business Units Success',
  GET_BUSINESS_UNITS_FAILURE = '[TermsConditions] Get All Business Units Failure',

  TERMS_CONDITIONS_UPDATE_ATTEMPT = '[TermsConditions] Terms Conditions Update Attempt',
  TERMS_CONDITIONS_UPDATE_FAILURE = '[TermsConditions] Terms Conditions Update Failure',
  TERMS_CONDITIONS_UPDATE_SUCCESS = '[TermsConditions] Terms Conditions Update Success',
}

export class TermsConditionsAttempt implements Action {
  readonly type = TermsActionTypes.TERMS_CONDITIONS_ATTEMPT
  constructor() {}
}

export class TermsConditionsSuccess implements Action {
  readonly type = TermsActionTypes.TERMS_CONDITIONS_SUCCESS
  constructor(public payload: { response: BootstrapResponse }) {}
}

export class TermsConditionsFailure implements Action {
  readonly type = TermsActionTypes.TERMS_CONDITIONS_FAILURE
  constructor(public payload?: { error: HttpErrorResponse }) {}
}

export class TermsConditionsUpdateAttempt implements Action {
  readonly type = TermsActionTypes.TERMS_CONDITIONS_UPDATE_ATTEMPT
  constructor(public payload: { request: TermsConditionsPostRequest }) {}
}

export class TermsConditionsUpdateSuccess implements Action {
  readonly type = TermsActionTypes.TERMS_CONDITIONS_UPDATE_SUCCESS
  constructor(public payload: { update: TermsAndConditions }) {}
}

export class TermsConditionsUpdateFailure implements Action {
  readonly type = TermsActionTypes.TERMS_CONDITIONS_UPDATE_FAILURE
  constructor(public payload?: { error: HttpErrorResponse }) {}
}

export class GetBusinessUnitsAttempt implements Action {
  readonly type = TermsActionTypes.GET_BUSINESS_UNITS
  constructor() {}
}

export class GetBusinessUnitsSuccess implements Action {
  readonly type = TermsActionTypes.GET_BUSINESS_UNITS_SUCCESS
  constructor(public payload?: BusinessData[]) {}
}

export class GetBusinessUnitsFailure implements Action {
  readonly type = TermsActionTypes.GET_BUSINESS_UNITS_FAILURE
  constructor(public payload?: any) {}
}

export type TermsActions =
  | TermsConditionsAttempt
  | TermsConditionsSuccess
  | TermsConditionsFailure
  | TermsConditionsUpdateAttempt
  | TermsConditionsUpdateSuccess
  | TermsConditionsUpdateFailure
  | GetBusinessUnitsAttempt
  | GetBusinessUnitsSuccess
  | GetBusinessUnitsFailure
