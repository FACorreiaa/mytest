import * as Actions from '../actions/profile.actions'
import { FetchVerificationResponse, BusinessData } from '@app/api/models/api-models'

export interface ProfileState {
  isLoading: boolean
  business: BusinessData[]
  errorMessage: string
  updateSucess: boolean
}

export const initialState: ProfileState = {
  isLoading: false,
  business: [],
  errorMessage: null,
  updateSucess: false,
}

export function profileReducer(state: ProfileState = initialState, action: Actions.ProfileActions): ProfileState {
  switch (action.type) {
    case Actions.ActionTypes.GET_BUSINESS_UNITS_SUCCESS: {
      return { ...state, business: action.payload, updateSucess: false }
    }

    case Actions.ActionTypes.UPDATE_BUSINESS_SUCCESS: {
      return { ...state, updateSucess: action.payload }
    }

    case Actions.ActionTypes.UPDATE_BUSINESS_FAILURE: {
      return { ...state, updateSucess: false }
    }

    case Actions.ActionTypes.ERROR_LAYOUT_SHOW: {
      return {
        ...state,
        errorMessage: action.payload.payload.error ? action.payload.payload.error._body : '',
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
