import * as Actions from '../actions/profile.actions'
import { FetchVerificationResponse, BusinessData } from '@app/api/models/api-models'

export interface ProfileState {
  isLoading: boolean
  business: BusinessData[]
  errorMessage: string
  updateSucess: boolean
  errorUpdating: boolean
}

export const initialState: ProfileState = {
  isLoading: false,
  business: [],
  errorMessage: null,
  updateSucess: false,
  errorUpdating: false,
}

export function profileReducer(state: ProfileState = initialState, action: Actions.ProfileActions): ProfileState {
  switch (action.type) {
    case Actions.ActionTypes.UPDATE_BUSINESS_ATTEMPT: {
      return { ...state, updateSucess: false, errorUpdating: false }
    }

    case Actions.ActionTypes.UPDATE_BUSINESS_SUCCESS: {
      return { ...state, updateSucess: action.payload, errorUpdating: false }
    }

    case Actions.ActionTypes.UPDATE_BUSINESS_FAILURE: {
      console.log('reducer failure')
      return { ...state, errorUpdating: true }
    }

    case Actions.ActionTypes.ERROR_LAYOUT_SHOW: {
      return {
        ...state,
        errorMessage: action.payload.payload.error ? action.payload.payload.error._body : '',
        isLoading: false,
      }
    }

    case Actions.ActionTypes.ERROR_LAYOUT_HIDE: {
      return { ...state, errorMessage: '', updateSucess: false, errorUpdating: false }
    }

    default:
      return state
  }
}
