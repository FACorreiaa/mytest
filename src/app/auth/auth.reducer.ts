import { AuthState, AuthReducer } from './store/reducers/auth.reducer'

export { AuthState, AuthReducer }

export const reducerName = 'auth'

export const getAuthState = (state: AuthState) => state

export const getUserAuthorization = (state: AuthState) => state.authorized

export const getLanguage = (state: AuthState) => state.language

export const hasLoginError = (state: AuthState) => state.hasLoginError

export const getLoading = (state: AuthState) => state.loading

export const getLoggedUser = (state: AuthState) => state.loggedUser

export const getErrorMessage = (state: AuthState) => state.errorMessage
