import { Action, createSelector, ActionReducerMap, createFeatureSelector } from '@ngrx/store'

import * as fromReviews from './store/reducers/review.reducer'

export const reducerName = 'reviewReducer'

export interface ReviewState {
  review: fromReviews.ReviewState
}

export const reducers: ActionReducerMap<ReviewState> = {
  review: fromReviews.reviewReducer,
}

// Review
export const getReviewState = createFeatureSelector<ReviewState>(reducerName)

export const getReviewBusinessList = createSelector(
  getReviewState,
  (state: ReviewState) => state.review.reviews
)
