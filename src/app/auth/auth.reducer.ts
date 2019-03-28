import { AuthState, AuthReducer } from './store/reducers/auth.reducer'

export { AuthState, AuthReducer }

export const reducerName = 'auth'

export const getAuthState = (state: AuthState) => state

/* TODO - remove in the future if not necessary- commented because register/login flow not responsibility of HR SSO*/
// export const getUserAuthorization = (state: AuthState) => state.authorized
// export const hasLoginError = (state: AuthState) => state.hasLoginError
// export const getLoggedUser = (state: AuthState) => state.loggedUser

export const getLanguage = (state: AuthState) => state.language

export const getLoading = (state: AuthState) => state.loading

export const getErrorMessage = (state: AuthState) => state.errorMessage
