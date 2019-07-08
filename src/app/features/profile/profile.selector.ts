import { Action, createSelector, ActionReducerMap, createFeatureSelector } from '@ngrx/store'

import * as fromDocuments from './store/reducers/profile.reducer'

export const reducerName = 'profileReducer'

export interface ProfileState {
  profile: fromDocuments.ProfileState
}

export const reducers: ActionReducerMap<ProfileState> = {
  profile: fromDocuments.profileReducer,
}

// Profile

export const getProfileState = createFeatureSelector<ProfileState>(reducerName)

export const getProfileBusinessList = createSelector(
  getProfileState,
  (state: ProfileState) => state.profile.business
)

export const getUpdateProfile = createSelector(
  getProfileState,
  (state: ProfileState) => state.profile.updateSucess
)
