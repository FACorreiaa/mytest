import { Action, createSelector, ActionReducerMap, createFeatureSelector } from '@ngrx/store'

import * as fromDocuments from './store/reducers/dashboard.reducer'
import * as fromDirectories from '../../directories/google/store/google.reducer'

export const reducerName = 'dashboardReducer'

export interface DashBoardState {
  dashboard: fromDocuments.DashBoardState
  directories: fromDirectories.GoogleState
}

export const reducers: ActionReducerMap<DashBoardState> = {
  dashboard: fromDocuments.dashBoardReducer,
  directories: fromDirectories.googleReducer,
}

// DashBoard
export const getDashBoardState = createFeatureSelector<DashBoardState>(reducerName)

export const getDashBoardBusinessList = createSelector(
  getDashBoardState,
  (state: DashBoardState) => state.dashboard.business
)
export const getOauthTokenStatus = createSelector(
  getDashBoardState,
  (state: DashBoardState) => state.dashboard.oauthToken
)

export const getfecthVerificationOptions = createSelector(
  getDashBoardState,
  (state: DashBoardState) => state.dashboard.fetchVerificationOptions
)

export const initVerification = createSelector(
  getDashBoardState,
  (state: DashBoardState) => state.dashboard.initVerification
)

export const completeVerification = createSelector(
  getDashBoardState,
  (state: DashBoardState) => state.dashboard.completeVerification
)

// Directories

export const redirectURL = createSelector(
  getDashBoardState,
  (state: DashBoardState) => state.directories.redirectUrl
)
