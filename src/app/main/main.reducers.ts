import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromDashBoard from './store/reducers/dashboard.reducer'

export const reducerName = 'main'

export interface MainState {
  dashBoard: fromDashBoard.DashBoardState
}

export const reducers: ActionReducerMap<MainState> = {
  dashBoard: fromDashBoard.UserLoggedReducer,
}

const getModuleState = createFeatureSelector<MainState>(reducerName)

// DashBoard

export const getBusiness = createSelector(getModuleState, (state: MainState) => state.dashBoard.business)

export const getLoading = createSelector(getModuleState, (state: MainState) => state.dashBoard.isLoading)
