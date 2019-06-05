import { combineReducers, createSelector, ActionReducer, ActionReducerMap } from '@ngrx/store'
import * as fromRouter from '@ngrx/router-store'
import * as fromAuth from './auth/auth.reducer'
import * as fromMain from './main/main.selectors'

export default interface AppState {
  router: fromRouter.RouterReducerState
  auth: fromAuth.AuthState
}

export { AppState }

const reducersDefinition: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer,
  router: fromRouter.routerReducer,
}

export const appReducers = reducersDefinition

// Routing
export const getRouter = (state: AppState) => state.router

export const getRouterPath = (state: AppState) => state.router.state.url

// OnBoarding
export const getAuthState = (state: AppState) => state.auth

export const language = createSelector(getAuthState, fromAuth.getLanguage)

export const restaurantAssistent = createSelector(getAuthState, fromAuth.getRestaurantAssistent)

export const claimData = createSelector(getAuthState, fromAuth.getClaimData)

export const loading = createSelector(getAuthState, fromAuth.getLoading)

export const errorMessage = createSelector(getAuthState, fromAuth.getErrorMessage)
