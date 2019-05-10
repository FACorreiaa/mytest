import { Action, createSelector, ActionReducerMap, createFeatureSelector } from '@ngrx/store'

import * as fromDocuments from './store/reducers/dashboard.reducer'

export const reducerName = 'dashboardReducer'

export interface DashBoardState {
  dashboard: fromDocuments.DashBoardState
}

export const reducers: ActionReducerMap<DashBoardState> = {
  dashboard: fromDocuments.DashBoardReducer,
}

// DashBoard

export const getDashBoardState = createFeatureSelector<DashBoardState>(reducerName)

export const getDashBoardBusinessList = createSelector(getDashBoardState, (state: DashBoardState) => state.dashboard.business)

export const getfecthVerificationOptions = createSelector(getDashBoardState, (state: DashBoardState) => state.dashboard.fetchVerificationOptions)

export const initVerification = createSelector(getDashBoardState, (state: DashBoardState) => state.dashboard.initVerification)

export const completeVerification = createSelector(getDashBoardState, (state: DashBoardState) => state.dashboard.completeVerification)
