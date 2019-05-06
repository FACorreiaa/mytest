import { AuthActions, AuthActionTypes } from '../actions/auth.action'
import { ManageBusinessData } from '@app/api/models/api-models'

export interface AuthState {
  claimData: ManageBusinessData
  loading: boolean
  hasManageError: boolean
  errorMessage: string
  language: string
}

const initialState: AuthState = {
  claimData: null,
  loading: false,
  hasManageError: false,
  errorMessage: null,
  language: 'en',
}

export function AuthReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.MANAGE_BUSINESS_ATTEMPT: {
      return Object.assign({}, state, {
        loading: true,
      })
    }

    case AuthActionTypes.MANAGE_BUSINESS_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        hasManageError: false,
      })
    }

    case AuthActionTypes.MANAGE_BUSINESS_FAILURE: {
      return Object.assign({}, state, {
        hasManageError: true,
        loading: false,
      })
    }

    case AuthActionTypes.ERROR_LAYOUT_SHOW: {
      // console.log('reducer', action.payload.payload.error)
      return {
        ...state,
        errorMessage: action.payload.payload.error,
      }
    }

    case AuthActionTypes.ERROR_LAYOUT_HIDE: {
      return Object.assign({}, state, {
        errorOpened: false,
        errorStatus: 0,
        errorLabel: '',
      })
    }

    case AuthActionTypes.CHANGE_LANGUAGE: {
      return { ...state, language: action.payload.language }
    }

    default:
      return state
  }
}
