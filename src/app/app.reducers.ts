import { combineReducers, createSelector, ActionReducer, ActionReducerMap } from '@ngrx/store'
import * as fromRouter from '@ngrx/router-store'
import * as fromAuth from './auth/auth.reducer'

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

// Auth

export const getAuthState = (state: AppState) => state.auth

export const userAuthorized = createSelector(getAuthState, fromAuth.getUserAuthorization)

export const hasLoginError = createSelector(getAuthState, fromAuth.hasLoginError)

export const loginLoading = createSelector(getAuthState, fromAuth.getLoading)

export const getLoggedUser = createSelector(getAuthState, fromAuth.getLoggedUser)

export const getLoggedUserRoles = createSelector(getLoggedUser, loggedUser => {
  if (loggedUser !== null && loggedUser !== undefined) {
    if (loggedUser.User !== null && loggedUser.User !== undefined) {
      return loggedUser.User.UserRoles
    }
  }
  return []
})
