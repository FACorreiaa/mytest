import * as Actions from './google.actions'
import { BusinessData } from '@app/api/models/api-models'
import { loading } from '@app/app.reducers'

export interface GoogleState {
  selectedBusiness: any
  redirectUrl: string
  oauthToken: boolean
  business: BusinessData[]
  loading: boolean
}

export const initialState: GoogleState = {
  selectedBusiness: null,
  redirectUrl: null,
  oauthToken: null,
  business: [],
  loading: false,
}

export function googleReducer(state: GoogleState = initialState, action: Actions.GoogleAction): GoogleState {
  switch (action.type) {
    case Actions.ActionTypes.GET_BUSINESS_UNITS:
    case Actions.ActionTypes.OAUTH_TOKEN_ATTEMPT:
    case Actions.ActionTypes.REQUEST_ADMIN_RIGHTS_ATTEMPT: {
      return { ...state, loading: true }
    }

    case Actions.ActionTypes.GET_BUSINESS_UNITS_FAILURE:
    case Actions.ActionTypes.REQUEST_ADMIN_RIGHTS_FAILURE: {
      return { ...state, loading: false }
    }

    case Actions.ActionTypes.GET_BUSINESS_UNITS_SUCCESS: {
      return { ...state, business: action.payload, loading: false }
    }

    case Actions.ActionTypes.REQUEST_ADMIN_RIGHTS_SUCCESS: {
      return { ...state, redirectUrl: action.payload, loading: false }
    }

    case Actions.ActionTypes.OAUTH_TOKEN_FAILURE: {
      return { ...state, oauthToken: false, loading: false }
    }

    case Actions.ActionTypes.OAUTH_TOKEN_SUCCESS: {
      return { ...state, oauthToken: true, loading: false }
    }

    default:
      return state
  }
}
