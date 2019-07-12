import * as Actions from '../actions/review.actions'
import { ReviewsResponse, UpdateReview, DeleteReview } from '@app/api/models/api-models'

export interface ReviewState {
  establishment: number
  reviews: ReviewsResponse
  updateReview: UpdateReview
  deletedReview: DeleteReview
}

export const initialState: ReviewState = {
  establishment: null,
  reviews: null,
  updateReview: null,
  deletedReview: null,
}

export function reviewReducer(state: ReviewState = initialState, action: Actions.ReviewAction): ReviewState {
  switch (action.type) {
    case Actions.ActionTypes.GET_REVIEWS_ATTEMPT: {
      return { ...state, establishment: action.payload.establishmentId }
    }

    case Actions.ActionTypes.GET_REVIEWS_SUCCESS: {
      return { ...state, reviews: action.payload.response }
    }

    case Actions.ActionTypes.GET_REVIEWS_FAILURE: {
      return { ...state, reviews: null }
    }

    case Actions.ActionTypes.UPDATE_REVIEWS_ATTEMPT: {
      return { ...state, updateReview: action.payload.request }
    }

    case Actions.ActionTypes.UPDATE_REVIEWS_SUCCESS: {
      return { ...state, updateReview: null }
    }

    case Actions.ActionTypes.UPDATE_REVIEWS_FAILURE: {
      return { ...state, updateReview: null }
    }

    case Actions.ActionTypes.DELETE_REVIEWS_ATTEMPT: {
      return { ...state, deletedReview: action.payload.request }
    }

    case Actions.ActionTypes.DELETE_REVIEWS_SUCCESS: {
      return { ...state, updateReview: null }
    }

    case Actions.ActionTypes.DELETE_REVIEWS_FAILURE: {
      return { ...state, deletedReview: null }
    }

    default:
      return state
  }
}
