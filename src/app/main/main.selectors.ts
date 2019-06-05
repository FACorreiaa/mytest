import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromTermsConditions from './store/reducers/terms-cond.reducers'

export const reducerName = 'main'

export interface MainState {
  termsConditions: fromTermsConditions.TermsState
}

export const reducers: ActionReducerMap<MainState> = {
  termsConditions: fromTermsConditions.TermsReducer,
}

const getModuleState = createFeatureSelector<MainState>(reducerName)

// Terms & Conditions
export const getTermsConditionsState = createSelector(getModuleState, (state: MainState) => state.termsConditions.termsConditions)
