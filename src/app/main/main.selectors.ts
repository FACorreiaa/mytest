import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromTermsConditions from './store/reducers/terms-cond.reducers'
import * as fromDashboard from '@app/features/dashboard/store/reducers/dashboard.reducer'
import * as fromAuth from '@app/auth/store/reducers/auth.reducer'
import * as fromDocuments from '@app/features/profile/store/reducers/profile.reducer'

export const reducerName = 'main'

export interface MainState {
  termsConditions: fromTermsConditions.TermsState
  dashboard: fromDashboard.DashBoardState
  auth: fromAuth.AuthState
  profile: fromDocuments.ProfileState
}

export const reducers: ActionReducerMap<MainState> = {
  termsConditions: fromTermsConditions.TermsReducer,
  dashboard: fromDashboard.dashBoardReducer,
  auth: fromAuth.AuthReducer,
  profile: fromDocuments.profileReducer,
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
  (stateMain: MainState) => stateMain.termsConditions
)

export const getTermsConditions = createSelector(
  getModuleState,
  (stateMain: MainState) => stateMain.termsConditions.termsConditions
)

export const getEstablisment = createSelector(
  getModuleState,
  (stateMain: MainState) => stateMain.termsConditions.establishments
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

export const language = createSelector(
  getModuleState,
  (stateMain: MainState) => stateMain.auth.language
)

export const restaurantAssistent = createSelector(
  getModuleState,
  (stateMain: MainState) => stateMain.auth.restaurantAssistent
)

export const claimData = createSelector(
  getModuleState,
  (stateMain: MainState) => stateMain.auth.claimData
)

export const loading = createSelector(
  getModuleState,
  (stateMain: MainState) => stateMain.auth.loading
)

export const errorMessage = createSelector(
  getModuleState,
  (stateMain: MainState) => stateMain.auth.errorMessage
)

export const getNavBarState = createSelector(
  getModuleState,
  (stateMain: MainState) => stateMain.auth.showNavMenu
)

// Account Settings (Admin)
export const getProfileBusinessList = createSelector(
  getModuleState,
  (state: MainState) => state.profile.business
)
