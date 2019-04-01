import { Action } from '@ngrx/store'
import { ManageBusinessData } from '@app/api/models/api-models'

export const ActionTypes = {
  GET_BUSINESS_UNITS: '[GetBusinessUnits] Get All Business Units',
  GET_BUSINESS_UNITS_SUCCESS: '[GetBusinessUnits] Get All Business Units Success',
  GET_BUSINESS_UNITS_FAILURE: '[GetBusinessUnits] Get All Business Units Failure',
  ERROR_LAYOUT_SHOW: '[Error] show',
  ERROR_LAYOUT_HIDE: '[Error] hide',
}

export class GetAllBusinessAction implements Action {
  public type = ActionTypes.GET_BUSINESS_UNITS
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

export class ErrorLayoutShow implements Action {
  public type = ActionTypes.ERROR_LAYOUT_SHOW
  constructor(public payload: any) {}
}

export class ErrorLayoutHide implements Action {
  public type = ActionTypes.ERROR_LAYOUT_HIDE
  constructor(public payload: any) {}
}

export type DashBoardAction = GetAllBusinessAction | GetAllBusinessSuccessAction | GetAllBusinessFailureAction | ErrorLayoutShow | ErrorLayoutHide
