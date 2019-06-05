import { TermsActions, TermsActionTypes } from '../actions/terms-cond.action'
import { TermsConditionsGetResponse } from '@app/api/models/api-models'

export interface TermsState {
  termsConditions: TermsConditionsGetResponse
  loading: boolean
}

const initialState: TermsState = {
  termsConditions: null,
  loading: false,
}

export function TermsReducer(state: TermsState = initialState, action: TermsActions): TermsState {
  switch (action.type) {
    case TermsActionTypes.TERMS_CONDITIONS_UPDATE_ATTEMPT:
    case TermsActionTypes.TERMS_CONDITIONS_ATTEMPT: {
      return { ...state, loading: true }
    }

    case TermsActionTypes.TERMS_CONDITIONS_SUCCESS: {
      return { ...state, loading: false, termsConditions: action.payload.response }
    }

    case TermsActionTypes.TERMS_CONDITIONS_UPDATE_SUCCESS: {
      return { ...state, loading: false, termsConditions: action.payload.update }
    }

    default:
      return state
  }
}
