import { Action } from '@ngrx/store'
import { ManageBusinessData } from '@app/api/models/api-models'

export const ActionTypes = {
  GET_BUSINESS_UNITS: '[GetBusinessUnits] Get All Business Units',
  GET_BUSINESS_UNITS_SUCCESS: '[GetBusinessUnits] Get All Business Units Success',
  GET_BUSINESS_UNITS_FAILURE: '[GetBusinessUnits] Get All Business Units Failure',
  EDIT_BUSINESS: '[EditBusiness] Edit Business',
  EDIT_BUSINESS_SUCCESS: '[EditBusiness] Edit Business Success',
  EDIT_BUSINESS_FAILURE: '[EditBusiness] Edit Business Failure',
  DELETE_BUSINESS: '[DeleteBusiness] Delete Business',
  DELETE_BUSINESS_SUCCESS: '[DeleteBusiness] Delete Business Success',
  DELETE_BUSINESS_FAILURE: '[DeleteBusiness] Delete Business Failure',
  ADD_BUSINESS: '[AddBusiness] Add Business',
  ADD_BUSINESS_SUCCESS: '[AddBusiness] Add Business Success',
  ADD_BUSINESS_FAILURE: '[AddBusiness] Add Business Failure',
  ERROR_LAYOUT_SHOW: '[Error] show',
  ERROR_LAYOUT_HIDE: '[Error] hide',
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
  constructor(public payload: any) {}
}

export class AddBusinessAction implements Action {
  public type = ActionTypes.ADD_BUSINESS
  constructor(public payload: ManageBusinessData) {}
}

export class AddBusinessSuccessAction implements Action {
  public type = ActionTypes.ADD_BUSINESS_SUCCESS
  constructor(public payload: any) {}
}

export class AddBusinessFailureAction implements Action {
  public type = ActionTypes.ADD_BUSINESS_FAILURE
  constructor(public payload: any) {}
}

export class DeleteBusinessAction implements Action {
  public type = ActionTypes.DELETE_BUSINESS
  constructor(public payload: any) {}
}

export class DeleteBusinessSuccessAction implements Action {
  public type = ActionTypes.DELETE_BUSINESS_SUCCESS
  constructor(public payload: any) {}
}

export class DeleteBusinessFailureAction implements Action {
  public type = ActionTypes.DELETE_BUSINESS_FAILURE
  constructor(public payload: any) {}
}

export class ErrorLayoutShow implements Action {
  public type = ActionTypes.ERROR_LAYOUT_SHOW
  constructor(public payload: any) {}
}

export class ErrorLayoutHide implements Action {
  public type = ActionTypes.ERROR_LAYOUT_HIDE
  constructor(public payload: any) {}
}

export class SelectBusinessAction implements Action {
  public type = ActionTypes.SELECT_ONE_BUSINESS
  constructor(public payload: string) {}
}

export type DashBoardAction =
  | GetAllBusinessAction
  | GetAllBusinessSuccessAction
  | GetAllBusinessFailureAction
  | EditBusinessAction
  | EditBusinessSuccessAction
  | EditBusinessFailureAction
  | DeleteBusinessAction
  | DeleteBusinessSuccessAction
  | DeleteBusinessFailureAction
  | AddBusinessAction
  | AddBusinessSuccessAction
  | AddBusinessFailureAction
  | ErrorLayoutShow
  | ErrorLayoutHide
