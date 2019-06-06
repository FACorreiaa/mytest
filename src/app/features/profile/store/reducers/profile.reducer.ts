import { Action } from '@ngrx/store'
import * as Actions from '../actions/profile.actions'
import { FetchVerificationResponse, BusinessData } from '@app/api/models/api-models'

export interface ProfileState {
    selectedBusiness: any
    isLoading: boolean
    business: BusinessData[]
    fetchVerificationOptions: FetchVerificationResponse
    initVerification: any
    completeVerification: any
    errorMessage: string
}

export const initialState: ProfileState = {
    isLoading: false,
    selectedBusiness: null,
    business: [],
    fetchVerificationOptions: null,
    initVerification: null,
    completeVerification: null,
    errorMessage: null,
}

export function profileReducer(state: ProfileState = initialState, action: Actions.ProfileAction): ProfileState {
    switch (action.type) {
        case Actions.ActionTypes.GET_BUSINESS_UNITS_SUCCESS: {
            return { ...state, business: action.payload }
        }

        case Actions.ActionTypes.FETCH_VERIFICATION_OPTIONS_SUCCESS: {
            return { ...state, fetchVerificationOptions: action.payload }
        }

        case Actions.ActionTypes.INIT_VERIFICATION_SUCCESS: {
            return { ...state, initVerification: action.payload }
        }

        case Actions.ActionTypes.COMPLETE_VERIFICATION_SUCCESS: {
            return { ...state, completeVerification: action.payload }
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
