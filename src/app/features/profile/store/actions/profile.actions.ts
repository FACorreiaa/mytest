import { Action } from '@ngrx/store'
import { UpdateBusinessData } from '@app/api/models/api-models'

export enum ActionTypes {
  UPDATE_BUSINESS_ATTEMPT = '[Profile] Update Business Unit Attempt',
  UPDATE_BUSINESS_SUCCESS = '[Profile] Update Business Unit Success',
  UPDATE_BUSINESS_FAILURE = '[Profile] Update Business Unit Failure',

  ERROR_LAYOUT_SHOW = '[Error] show',
  ERROR_LAYOUT_HIDE = '[Error] hide',
}

export class UpdateBusinessAttempt implements Action {
  readonly type = ActionTypes.UPDATE_BUSINESS_ATTEMPT
  constructor(public payload: { request: UpdateBusinessData }) {}
}

export class UpdateBusinessSuccess implements Action {
  readonly type = ActionTypes.UPDATE_BUSINESS_SUCCESS
  constructor(public payload: boolean) {}
}

export class UpdateBusinessFailure implements Action {
  readonly type = ActionTypes.UPDATE_BUSINESS_FAILURE
  constructor(public payload?: any) {}
}

export class ErrorLayoutShow implements Action {
  readonly type = ActionTypes.ERROR_LAYOUT_SHOW
  constructor(public payload: any) {}
}

export class ErrorLayoutHide implements Action {
  readonly type = ActionTypes.ERROR_LAYOUT_HIDE
  constructor(public payload?: any) {}
}

export type ProfileActions = UpdateBusinessAttempt | UpdateBusinessSuccess | UpdateBusinessFailure | ErrorLayoutHide | ErrorLayoutShow
