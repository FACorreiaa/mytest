import { Action } from '@ngrx/store'
import * as Actions from '../actions/dashboard.actions'
import { Data } from '@app/api/models/api-models'

export interface DashBoardState {
  selectedBusiness: any
  isLoading: boolean
  business: Data[]
}

const initialState: DashBoardState = {
  isLoading: false,
  selectedBusiness: null,
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
    case Actions.ActionTypes.SELECT_ONE_BUSINESS: {
      return { ...state, isLoading: false, selectedBusiness: action.payload }
    }
    default:
      return state
  }
}
