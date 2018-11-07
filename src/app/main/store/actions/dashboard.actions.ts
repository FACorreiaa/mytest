import { Action } from '@ngrx/store'

export const ActionTypes = {
  GET_BUSINESS_UNITS: '[GetBusinessUnits] Get All Business Units',
  GET_BUSINESS_UNITS_SUCCESS: '[GetBusinessUnits] Get All Business Units Success',
  GET_BUSINESS_UNITS_FAILURE: '[GetBusinessUnits] Get All Business Units Failure',
  SELECT_ONE_BUSINESS: '[GetBusinessUnits] Select One Business',
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

export class SelectBusinessAction implements Action {
  public type = ActionTypes.SELECT_ONE_BUSINESS
  constructor(public payload: string) {}
}

export type DashBoardAction = GetAllBusinessAction | GetAllBusinessSuccessAction | GetAllBusinessFailureAction
