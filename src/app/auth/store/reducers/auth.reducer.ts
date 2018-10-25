import { AuthActions, AuthActionTypes } from '../actions/auth.action'

export interface AuthState {
  authorized: boolean
  isRegister: boolean
  loggedUser: any
  userToken: string
  loading: boolean
  hasLoginError: boolean
}

const initialState: AuthState = {
  authorized: false,
  isRegister: false,
  loggedUser: null,
  userToken: null,
  loading: false,
  hasLoginError: false,
}

export const reducerName = 'auth'

export function AuthReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_ATTEMPT: {
      return Object.assign({}, state, {
        loading: true,
        loggedUser: action.payload.user,
      })
    }

    case AuthActionTypes.LOGIN_FAILURE: {
      return Object.assign({}, initialState, { hasLoginError: true })
    }

    case AuthActionTypes.LOGIN_SUCCESS: {
      const auth = {
        authorized: true,
        // loggedUser: Object.assign({}, action.payload),
        loading: false,
        hasLoginError: false,
      }
      return Object.assign({}, state, auth)
    }
    case AuthActionTypes.REGISTER_ATTEMPT: {
      return Object.assign({}, state, {
        loading: true,
        loggedUser: action.payload,
      })
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

    case AuthActionTypes.LOGOUT_FAILURE:
    case AuthActionTypes.LOGOUT_SUCCESS: {
      return initialState
    }

    default:
      return state
  }
}
