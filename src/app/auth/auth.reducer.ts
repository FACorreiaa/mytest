import { AuthState, AuthReducer } from './store/reducers/auth.reducer'

export { AuthState, AuthReducer }

export const reducerName = 'auth'

export const getAuthState = (state: AuthState) => state

export const getLanguage = (state: AuthState) => state.language

export const getLoading = (state: AuthState) => state.loading

export const getErrorMessage = (state: AuthState) => state.errorMessage

export const getRestaurantAssistent = (state: AuthState) => state.restaurantAssistent

export const getClaimData = (state: AuthState) => state.claimData
