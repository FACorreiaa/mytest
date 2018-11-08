import { Action } from '@ngrx/store'
import { ManageBusinessData } from '@app/api/models/api-models'

export const ActionTypes = {
  GET_BUSINESS_UNITS: '[GetBusinessUnits] Get All Business Units',
  GET_BUSINESS_UNITS_SUCCESS: '[GetBusinessUnits] Get All Business Units Success',
  GET_BUSINESS_UNITS_FAILURE: '[GetBusinessUnits] Get All Business Units Failure',
  EDIT_BUSINESS: '[EditBusiness] Edit Business',
  EDIT_BUSINESS_SUCCESS: '[EditBusiness] Edit Business Success',
  EDIT_BUSINESS_FAILURE: '[EditBusiness] Edit Business Failure',
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

export class EditBusinessAction implements Action {
  public type = ActionTypes.EDIT_BUSINESS
  constructor(public payload: ManageBusinessData) {}
}

export class EditBusinessSuccessAction implements Action {
  public type = ActionTypes.EDIT_BUSINESS_SUCCESS
  constructor(public payload: ManageBusinessData) {}
}

export class EditBusinessFailureAction implements Action {
  public type = ActionTypes.EDIT_BUSINESS_FAILURE
  constructor(public payload: ManageBusinessData) {}
}

export class SelectBusinessAction implements Action {
  public type = ActionTypes.SELECT_ONE_BUSINESS
  constructor(public payload: string) {}
}

export type DashBoardAction = GetAllBusinessAction | GetAllBusinessSuccessAction | GetAllBusinessFailureAction
