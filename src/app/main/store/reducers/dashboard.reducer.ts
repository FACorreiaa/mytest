import { Action } from '@ngrx/store'
import * as Actions from '../actions/dashboard.actions'

export interface DashBoardState {
  isLoading: boolean
  business: any[]
}

const initialState: DashBoardState = {
  isLoading: false,
  business: [],
}

export function UserLoggedReducer(state = initialState, action: Actions.DashBoardAction): DashBoardState {
  switch (action.type) {
    case Actions.ActionTypes.GET_BUSINESS_UNITS: {
      return { ...state, isLoading: true }
    }
    case Actions.ActionTypes.GET_BUSINESS_UNITS_SUCCESS: {
      return { ...state, isLoading: false, business: action.payload }
    }
    default:
      return state
  }
}
