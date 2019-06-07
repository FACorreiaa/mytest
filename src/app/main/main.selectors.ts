import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromTermsConditions from './store/reducers/terms-cond.reducers'
import * as fromDashboard from '@app/features/dashboard/store/reducers/dashboard.reducer'
import { state } from '@angular/animations'

export const reducerName = 'main'

export interface MainState {
  termsConditions: fromTermsConditions.TermsState
  dashboard: fromDashboard.DashBoardState
}

export const reducers: ActionReducerMap<MainState> = {
  termsConditions: fromTermsConditions.TermsReducer,
  dashboard: fromDashboard.dashBoardReducer,
}

const getModuleState = createFeatureSelector<MainState>(reducerName)

// Terms & Conditions
export const getTermsConditionsState = createSelector(getModuleState, (stateMain: MainState) => stateMain.termsConditions.termsConditions)

// Dashboard
export const getDashboardState = createSelector(getModuleState, (stateMain: MainState) => stateMain.dashboard.business)
