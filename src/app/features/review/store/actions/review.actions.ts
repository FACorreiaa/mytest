import { Action } from '@ngrx/store'
import { LocationData, RequestAdminRightsBusinessId, BusinessData, ReviewsResponse, UpdateReview, DeleteReview } from '@app/api/models/api-models'

export enum ActionTypes {
  GET_REVIEWS_ATTEMPT = '[Reviews] Get All Reviews Attempt',
  GET_REVIEWS_SUCCESS = '[Reviews] Get All Reviews Success',
  GET_REVIEWS_FAILURE = '[Reviews] Get All Reviews Failure',

  UPDATE_REVIEWS_ATTEMPT = '[Reviews] Update Review Attempt',
  UPDATE_REVIEWS_SUCCESS = '[Reviews] Update Review Success',
  UPDATE_REVIEWS_FAILURE = '[Reviews] Update Review Failure',

  DELETE_REVIEWS_ATTEMPT = '[Reviews] Delete Review Attempt',
  DELETE_REVIEWS_SUCCESS = '[Reviews] Delete Review Success',
  DELETE_REVIEWS_FAILURE = '[Reviews] Delete Review Failure',
}

/*--- Get all business ---*/
export class GetAllReviewsAttempt implements Action {
  readonly type = ActionTypes.GET_REVIEWS_ATTEMPT
  constructor(public payload: { establishmentId: number }) {}
}

export class GetAllReviewsSuccess implements Action {
  readonly type = ActionTypes.GET_REVIEWS_SUCCESS
  constructor(public payload: { response: ReviewsResponse }) {}
}

export class GetAllReviewsFailure implements Action {
  readonly type = ActionTypes.GET_REVIEWS_FAILURE
  constructor(public payload?: any) {}
}

export class UpdateReviewAttempt implements Action {
  readonly type = ActionTypes.UPDATE_REVIEWS_ATTEMPT
  constructor(public payload: { request: UpdateReview }) {}
}

export class UpdateReviewSuccess implements Action {
  readonly type = ActionTypes.UPDATE_REVIEWS_SUCCESS
  constructor(public payload?: any) {}
}

export class UpdateReviewFailure implements Action {
  readonly type = ActionTypes.UPDATE_REVIEWS_FAILURE
  constructor(public payload?: any) {}
}

export class DeleteReviewAttempt implements Action {
  readonly type = ActionTypes.DELETE_REVIEWS_ATTEMPT
  constructor(public payload: { request: DeleteReview }) {}
}

export class DeleteReviewSuccess implements Action {
  readonly type = ActionTypes.DELETE_REVIEWS_SUCCESS
  constructor(public payload?: any) {}
}

export class DeleteReviewFailure implements Action {
  readonly type = ActionTypes.DELETE_REVIEWS_FAILURE
  constructor(public payload?: any) {}
}

export type ReviewAction =
  | GetAllReviewsAttempt
  | GetAllReviewsFailure
  | GetAllReviewsSuccess
  | UpdateReviewAttempt
  | UpdateReviewSuccess
  | UpdateReviewFailure
  | DeleteReviewAttempt
  | DeleteReviewSuccess
  | DeleteReviewFailure
