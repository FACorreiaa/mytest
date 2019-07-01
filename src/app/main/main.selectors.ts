import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromTermsConditions from './store/reducers/terms-cond.reducers'
import * as fromDashboard from '@app/features/dashboard/store/reducers/dashboard.reducer'
import * as fromAuth from '@app/auth/store/reducers/auth.reducer'

export const reducerName = 'main'

export interface MainState {
  termsConditions: fromTermsConditions.TermsState
  dashboard: fromDashboard.DashBoardState
  auth: fromAuth.AuthState
}

export const reducers: ActionReducerMap<MainState> = {
  termsConditions: fromTermsConditions.TermsReducer,
  dashboard: fromDashboard.dashBoardReducer,
  auth: fromAuth.AuthReducer,
}

const getModuleState = createFeatureSelector<MainState>(reducerName)

// Loading
export const getLoading = createSelector(
  getModuleState,
  (stateMain: MainState) => stateMain.termsConditions.loading
)

// Terms & Conditions
export const getTermsConditionsState = createSelector(
  getModuleState,
  (stateMain: MainState) => stateMain.termsConditions.termsConditions
)

// Dashboard
export const getDashboardState = createSelector(
  getModuleState,
  (stateMain: MainState) => stateMain.dashboard.business
)

// Auth - OnBoarding
export const getAuth = createSelector(
  getModuleState,
  (stateMain: MainState) => stateMain.auth.hasManageError
)

export const getNavBarState = createSelector(
  getModuleState,
  (stateMain: MainState) => stateMain.auth.showNavMenu
)
