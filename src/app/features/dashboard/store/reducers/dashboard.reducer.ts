import { Action } from '@ngrx/store'
import * as Actions from '../actions/dashboard.actions'
import { FetchVerificationResponse, BusinessData } from '@app/api/models/api-models'

export interface DashBoardState {
  selectedBusiness: any
  redirectUrl: string
  isLoading: boolean
  oauthToken: boolean
  business: BusinessData[]
  fetchVerificationOptions: FetchVerificationResponse
  initVerification: any
  completeVerification: any
  errorMessage: string
}

export const initialState: DashBoardState = {
  isLoading: false,
  selectedBusiness: null,
  redirectUrl: null,
  oauthToken: null,
  business: [],
  fetchVerificationOptions: null,
  initVerification: null,
  completeVerification: null,
  errorMessage: null,
}

export function dashBoardReducer(state: DashBoardState = initialState, action: Actions.DashBoardAction): DashBoardState {
  switch (action.type) {
    case Actions.ActionTypes.GET_BUSINESS_UNITS_SUCCESS: {
      return { ...state, business: action.payload }
    }

    case Actions.ActionTypes.REQUEST_ADMIN_RIGHTS_SUCCESS: {
      return { ...state, redirectUrl: action.payload }
    }

    case Actions.ActionTypes.OAUTH_TOKEN_FAILURE: {
      return { ...state, oauthToken: false }
    }

    case Actions.ActionTypes.OAUTH_TOKEN_SUCCESS: {
      return { ...state, oauthToken: true }
    }

    case Actions.ActionTypes.FETCH_VERIFICATION_OPTIONS_SUCCESS: {
      return { ...state, fetchVerificationOptions: action.payload }
    }

    case Actions.ActionTypes.INIT_VERIFICATION_SUCCESS: {
      return { ...state, initVerification: action.payload }
    }

    case Actions.ActionTypes.COMPLETE_VERIFICATION_SUCCESS: {
      return { ...state, completeVerification: action.payload }
    }

    case Actions.ActionTypes.ERROR_LAYOUT_SHOW: {
      return {
        ...state,
        isLoading: false,
      }
    }

    case Actions.ActionTypes.ERROR_LAYOUT_HIDE: {
      return { ...state, errorMessage: '' }
    }

    default:
      return state
  }
}
