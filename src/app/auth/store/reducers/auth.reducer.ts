import { AuthActions, AuthActionTypes } from '../actions/auth.action'
import { ManageBusinessData } from '@app/api/models/api-models'

export interface AuthState {
  authorized: boolean
  isRegister: boolean
  loggedUser: any
  claimData: ManageBusinessData
  userToken: string
  loading: boolean
  hasLoginError: boolean
  hasRegisterError: boolean
  hasManageError: boolean
  errorMessage: string
  language: string
}

const initialState: AuthState = {
  authorized: false,
  isRegister: false,
  loggedUser: null,
  claimData: null,
  userToken: null,
  loading: false,
  hasLoginError: false,
  hasRegisterError: false,
  hasManageError: false,
  errorMessage: null,
  language: 'en',
}

export function AuthReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_ATTEMPT: {
      return Object.assign({}, state, {
        loading: true,
        loggedUser: action.payload,
      })
    }

    case AuthActionTypes.LOGIN_FAILURE: {
      return Object.assign({}, initialState, { hasLoginError: true })
    }

    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        authorized: true,
        userToken: action.payload.token,
        loggedUser: null,
        loading: false,
        hasLoginError: false,
      }
    }

    case AuthActionTypes.LOGIN_NO_REGISTER: {
      return {
        ...state,
        userToken: null,
      }
    }

    case AuthActionTypes.REGISTER_ATTEMPT: {
      return {
        ...state,
        loading: true,
        loggedUser: action.payload.user,
        claimData: action.payload.claim,
      }
    }

    case AuthActionTypes.REGISTER_FAILURE: {
      return Object.assign({}, initialState, { hasLoginError: true })
    }

    case AuthActionTypes.REGISTER_SUCCESS: {
      const auth = {
        isRegister: true,
        loading: false,
        hasLoginError: false,
      }
      return Object.assign({}, state, auth)
    }

    case AuthActionTypes.MANAGE_BUSINESS_ATTEMPT: {
      return Object.assign({}, state, {
        loading: true,
      })
    }

    case AuthActionTypes.MANAGE_BUSINESS_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        isRegister: false,
        loggedUser: null,
        hasLoginError: false,
        userToken: null,
      })
    }

    case AuthActionTypes.MANAGE_BUSINESS_FAILURE: {
      return Object.assign({}, state, {
        hasLoginError: true,
        loading: false,
      })
    }

    case AuthActionTypes.ERROR_LAYOUT_SHOW: {
      return {
        ...state,
        errorMessage: action.payload.payload.error ? action.payload.payload.error._body : '',
      }
    }

    case AuthActionTypes.ERROR_LAYOUT_HIDE: {
      return Object.assign({}, state, {
        errorOpened: false,
        errorStatus: 0,
        errorLabel: '',
      })
    }

    case AuthActionTypes.LOGOUT_FAILURE:
    case AuthActionTypes.LOGOUT_SUCCESS: {
      state.language = state.language === undefined ? (state.language = 'en') : state.language
      return { ...initialState, language: state.language }
    }

    case AuthActionTypes.CHANGE_LANGUAGE: {
      return { ...state, language: action.payload.language }
    }

    default:
      return state
  }
}
