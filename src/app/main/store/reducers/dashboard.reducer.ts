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

export function UserLoggedReducer(state = initialState, action: Actions.DashBoardAction): DashBoardState {
  switch (action.type) {
    case Actions.ActionTypes.GET_BUSINESS_UNITS_SUCCESS: {
      return { ...state, business: action.payload }
    }

    case Actions.ActionTypes.ADD_BUSINESS: {
      return { ...state, isLoading: true }
    }

    case Actions.ActionTypes.ADD_BUSINESS_SUCCESS: {
      return { ...state, isLoading: false }
    }

    case Actions.ActionTypes.ADD_BUSINESS_FAILURE: {
      return { ...state, isLoading: false }
    }

    case Actions.ActionTypes.DELETE_BUSINESS: {
      return { ...state, isLoading: true }
    }

    case Actions.ActionTypes.DELETE_BUSINESS_SUCCESS: {
      return { ...state, isLoading: false }
    }

    case Actions.ActionTypes.DELETE_BUSINESS_FAILURE: {
      return { ...state, isLoading: false }
    }

    case Actions.ActionTypes.EDIT_BUSINESS: {
      return { ...state, isLoading: true }
    }

    case Actions.ActionTypes.EDIT_BUSINESS_SUCCESS: {
      return { ...state, isLoading: false }
    }

    case Actions.ActionTypes.EDIT_BUSINESS_FAILURE: {
      return { ...state, isLoading: false }
    }

    case Actions.ActionTypes.ERROR_LAYOUT_SHOW: {
      return {
        ...state,
        errorMessage: action.payload.payload.error._body,
        isLoading: false,
      }
    }

    case Actions.ActionTypes.ERROR_LAYOUT_HIDE: {
      return { ...state, errorMessage: '' }
    }

    case Actions.ActionTypes.SELECT_ONE_BUSINESS: {
      return { ...state, isLoading: false, selectedBusiness: action.payload }
    }
    default:
      return state
  }
}
