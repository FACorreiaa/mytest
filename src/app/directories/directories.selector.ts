import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromGoogle from './google/store/google.reducer'

export const reducerName = 'directories'

export interface DirectoriesState {
  google: fromGoogle.GoogleState
}

export const reducers: ActionReducerMap<DirectoriesState> = {
  google: fromGoogle.googleReducer,
}

const getModuleState = createFeatureSelector<DirectoriesState>(reducerName)

export const getBusinessState = createSelector(getModuleState, (state: DirectoriesState) => state.google.business)
export const getOauthTokenStatus = createSelector(getModuleState, (state: DirectoriesState) => state.google.oauthToken)
export const getRedirectURL = createSelector(getModuleState, (state: DirectoriesState) => state.google.redirectUrl)
export const getLoading = createSelector(getModuleState, (state: DirectoriesState) => state.google.loading)
