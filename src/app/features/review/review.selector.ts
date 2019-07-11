import { Action, createSelector, ActionReducerMap, createFeatureSelector } from '@ngrx/store'

import * as fromDocuments from './store/reducers/review.reducer'
import * as fromDirectories from '../../directories/google/store/google.reducer'

export const reducerName = 'reviewReducer'

export interface ReviewState {
  review: fromDocuments.ReviewState
  directories: fromDirectories.GoogleState
}

export const reducers: ActionReducerMap<ReviewState> = {
  review: fromDocuments.reviewReducer,
  directories: fromDirectories.googleReducer,
}

// Review
export const getReviewState = createFeatureSelector<ReviewState>(reducerName)

export const getReviewBusinessList = createSelector(
  getReviewState,
  (state: ReviewState) => state.review.business
)
export const getOauthTokenStatus = createSelector(
  getReviewState,
  (state: ReviewState) => state.review.oauthToken
)

// Directories
export const redirectURL = createSelector(
  getReviewState,
  (state: ReviewState) => state.directories.redirectUrl
)
