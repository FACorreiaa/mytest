import { TermsActions, TermsActionTypes } from '../actions/terms-cond.action'
import { TermsAndConditions, Establishment } from '@app/api/models/api-models'

export interface TermsState {
  termsConditions: TermsAndConditions
  establishments: Establishment[]
  loading: boolean
}

const initialState: TermsState = {
  termsConditions: null,
  establishments: null,
  loading: false,
}

export function TermsReducer(state: TermsState = initialState, action: TermsActions): TermsState {
  switch (action.type) {
    case TermsActionTypes.TERMS_CONDITIONS_UPDATE_ATTEMPT:
    case TermsActionTypes.TERMS_CONDITIONS_ATTEMPT: {
      return { ...state, loading: true }
    }

    case TermsActionTypes.TERMS_CONDITIONS_SUCCESS: {
      return { ...state, loading: false, termsConditions: action.payload.response.termsAndConditions, establishments: action.payload.response.establishments }
    }

    case TermsActionTypes.TERMS_CONDITIONS_UPDATE_SUCCESS: {
      return { ...state, loading: false, termsConditions: action.payload.update }
    }

    default:
      return state
  }
}
