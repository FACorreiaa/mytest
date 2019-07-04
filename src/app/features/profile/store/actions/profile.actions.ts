import { Action } from '@ngrx/store'
import { BusinessData, ManageBusinessData, UpdateBusinessData } from '@app/api/models/api-models'

export const ActionTypes = {
  GET_BUSINESS_UNITS_ATTEMPT: '[Profile] Get All Business Units',
  GET_BUSINESS_UNITS_SUCCESS: '[Profile] Get All Business Units Success',
  GET_BUSINESS_UNITS_FAILURE: '[Profile] Get All Business Units Failure',

  UPDATE_BUSINESS_ATTEMPT: '[Profile] Update Business Unit Attempt',
  UPDATE_BUSINESS_SUCCESS: '[Profile] Update Business Unit Success',
  UPDATE_BUSINESS_FAILURE: '[Profile] Update Business Unit Failure',

  ERROR_LAYOUT_SHOW: '[Error] show',
  ERROR_LAYOUT_HIDE: '[Error] hide',
}

/* Get all business*/
export class GetAllBusinessAction implements Action {
  public type = ActionTypes.GET_BUSINESS_UNITS_ATTEMPT
  constructor(public payload?: any) {}
}

export class GetAllBusinessSuccessAction implements Action {
  public type = ActionTypes.GET_BUSINESS_UNITS_SUCCESS
  constructor(public payload?: any) {}
}

export class GetAllBusinessFailureAction implements Action {
  public type = ActionTypes.GET_BUSINESS_UNITS_FAILURE
  constructor(public payload?: any) {}
}

export class UpdateBusinessAttempt implements Action {
  public type = ActionTypes.UPDATE_BUSINESS_ATTEMPT
  constructor(public payload: { request: UpdateBusinessData }) {}
}

export class UpdateBusinessSuccess implements Action {
  public type = ActionTypes.GET_BUSINESS_UNITS_SUCCESS
  constructor(public payload: any) {}
}

export class UpdateBusinessFailure implements Action {
  public type = ActionTypes.UPDATE_BUSINESS_FAILURE
  constructor(public payload?: any) {}
}

export class ErrorLayoutShow implements Action {
  public type = ActionTypes.ERROR_LAYOUT_SHOW
  constructor(public payload: any) {}
}

export class ErrorLayoutHide implements Action {
  public type = ActionTypes.ERROR_LAYOUT_HIDE
  constructor(public payload: any) {}
}

export type ProfileAction = GetAllBusinessAction | GetAllBusinessSuccessAction | GetAllBusinessFailureAction | ErrorLayoutShow | ErrorLayoutHide
