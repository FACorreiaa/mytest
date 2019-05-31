import { AuthActions, AuthActionTypes } from '../actions/auth.action'
import { ManageBusinessData, BusinessData, OpeningTimes } from '@app/api/models/api-models'

export interface AuthState {
  claimData: ManageBusinessData
  restaurantAssistent: IHydraRestaurant
  loading: boolean
  hasManageError: boolean
  errorMessage: string
  language: string
}

const initialState: AuthState = {
  claimData: null,
  restaurantAssistent: null,
  loading: false,
  hasManageError: false,
  errorMessage: null,
  language: 'en',
}

export function AuthReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.MANAGE_BUSINESS_ATTEMPT: {
      return Object.assign({}, state, {
        loading: true,
      })
    }

    case AuthActionTypes.MANAGE_BUSINESS_SUCCESS: {
      return { ...state, loading: false, hasManageError: false }
    }

    case AuthActionTypes.MANAGE_BUSINESS_FAILURE: {
      return Object.assign({}, state, {
        hasManageError: true,
        loading: false,
      })
    }

    case AuthActionTypes.RESTAURANT_ASSISTENT_ATTEMPT: {
      return Object.assign({}, state, {
        loading: true,
      })
    }

    case AuthActionTypes.RESTAURANT_ASSISTENT_SUCCESS: {
      const restaurantAssistent = Object.assign({}, action.payload)

      const openingTimesData: OpeningTimes = { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] }
      let businessData: BusinessData = null
      if (Object.values(restaurantAssistent).length !== 0) {
        restaurantAssistent.openingTimes.forEach((day: IHydraOpeningTime) => {
          if (day.weekday === 1) {
            openingTimesData.monday.push({ startTime: day.timeIntervals[0].startTime, endTime: day.timeIntervals[0].endTime })
          }
          if (day.weekday === 2) {
            openingTimesData.tuesday.push({ startTime: day.timeIntervals[0].startTime, endTime: day.timeIntervals[0].endTime })
          }
          if (day.weekday === 3) {
            openingTimesData.wednesday.push({ startTime: day.timeIntervals[0].startTime, endTime: day.timeIntervals[0].endTime })
          }
          if (day.weekday === 4) {
            openingTimesData.thursday.push({ startTime: day.timeIntervals[0].startTime, endTime: day.timeIntervals[0].endTime })
          }
          if (day.weekday === 5) {
            openingTimesData.friday.push({ startTime: day.timeIntervals[0].startTime, endTime: day.timeIntervals[0].endTime })
          }
          if (day.weekday === 6) {
            openingTimesData.saturday.push({ startTime: day.timeIntervals[0].startTime, endTime: day.timeIntervals[0].endTime })
          }
          if (day.weekday === 7) {
            openingTimesData.sunday.push({ startTime: day.timeIntervals[0].startTime, endTime: day.timeIntervals[0].endTime })
          }
        })

        businessData = {
          name: restaurantAssistent.name,
          description: restaurantAssistent.description,
          street: restaurantAssistent.address1,
          zipCode: restaurantAssistent.zipCode,
          city: restaurantAssistent.city,
          contactPhoneNumber: restaurantAssistent.phone,
          contactEmail: restaurantAssistent.email,
          url: restaurantAssistent.url,
          countryCode: restaurantAssistent.country,
          openingTimes: openingTimesData,
        }
      }

      return Object.assign({}, state, {
        loading: false,
        restaurantAssistent: restaurantAssistent,
        claimData: businessData,
      })
    }

    case AuthActionTypes.ERROR_LAYOUT_SHOW: {
      return {
        ...state,
        errorMessage: action.payload.payload.error,
      }
    }

    case AuthActionTypes.ERROR_LAYOUT_HIDE: {
      return Object.assign({}, state, {
        errorOpened: false,
        errorStatus: 0,
        errorLabel: '',
      })
    }

    case AuthActionTypes.CHANGE_LANGUAGE: {
      return { ...state, language: action.payload.language }
    }

    default:
      return state
  }
}
