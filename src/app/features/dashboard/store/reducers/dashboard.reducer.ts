import { Action } from '@ngrx/store'
import * as Actions from '../actions/dashboard.actions'
import { Data } from '@app/api/models/api-models'

export interface DashBoardState {
  selectedBusiness: any
  isLoading: boolean
  business: Data[]
  errorMessage: string
}

const initialState: DashBoardState = {
  isLoading: false,
  selectedBusiness: null,
  business: [],
  errorMessage: null,
}

export function DashBoardReducer(state = initialState, action: Actions.DashBoardAction): DashBoardState {
  switch (action.type) {
    case Actions.ActionTypes.GET_BUSINESS_UNITS_SUCCESS: {
      return { ...state, business: action.payload }
    }

    case Actions.ActionTypes.ERROR_LAYOUT_SHOW: {
      return {
        ...state,
        errorMessage: action.payload.payload.error ? action.payload.payload.error._body : '',
        isLoading: false,
      }
    }

    case Actions.ActionTypes.ERROR_LAYOUT_HIDE: {
      return { ...state, errorMessage: '' }
    }

    default:
      return state
  }
}
