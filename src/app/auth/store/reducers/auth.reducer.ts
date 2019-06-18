import { AuthActions, AuthActionTypes } from '../actions/auth.action'
import { ManageBusinessData, BusinessData, OpeningTimes, LocationData } from '@app/api/models/api-models'
import { loading } from '@app/app.reducers'

export interface AuthState {
  claimData: ManageBusinessData
  requestBody: LocationData
  restaurantAssistent: IHydraRestaurant
  loading: boolean
  redirectUrl: any
  hasManageError: boolean
  errorMessage: string
  language: string
  showNavMenu: boolean
}

const initialState: AuthState = {
  claimData: null,
  requestBody: null,
  restaurantAssistent: null,
  loading: false,
  redirectUrl: null,
  hasManageError: false,
  errorMessage: null,
  showNavMenu: true,
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
      return {
        ...state,
        loading: false,
        hasManageError: false,
        claimData: action.payload.manageResponse.GOOGLE_MY_BUSINESS.status === 409 ? action.payload.manageResponse.GOOGLE_MY_BUSINESS.requestBody.businessUnit : null,
        requestBody: action.payload.manageResponse.GOOGLE_MY_BUSINESS.status === 409 ? action.payload.manageResponse.GOOGLE_MY_BUSINESS.requestBody : null,
      }
    }

    case AuthActionTypes.MANAGE_BUSINESS_FAILURE: {
      return { ...state, hasManageError: true, loading: false }
    }

    case AuthActionTypes.REQUEST_ADMIN_RIGHTS_ATTEMPT: {
      console.log('entreiii reducer')
      return { ...state, loading: true }
    }

    case AuthActionTypes.REQUEST_ADMIN_RIGHTS_FAILURE: {
      return { ...state, loading: false }
    }

    case AuthActionTypes.REQUEST_ADMIN_RIGHTS_SUCCESS: {
      return { ...state, loading: false, redirectUrl: action.payload }
    }

    case AuthActionTypes.RESTAURANT_ASSISTENT_ATTEMPT: {
      return Object.assign({}, state, {
        loading: true,
      })
    }

    case AuthActionTypes.RESTAURANT_ASSISTENT_SUCCESS: {
      const restaurantAssistent = Object.assign({}, action.payload.restaurant)

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
          languageCode: restaurantAssistent.country,
          // ToDo: check why this values are not in hydra service data
          category: '',
          additional: '',
          userFirstName: '',
          userLastName: '',
        }
      }

      return Object.assign({}, state, {
        loading: false,
        restaurantAssistent: restaurantAssistent,
        claimData: businessData,
      })
    }

    case AuthActionTypes.ERROR_LAYOUT_SHOW: {
      console.log('entreiii reducer error', action.payload.error)
      return {
        ...state,
        errorMessage: action.payload.error,
      }
    }

    case AuthActionTypes.ERROR_LAYOUT_HIDE: {
      return Object.assign({}, state, {
        errorOpened: false,
        errorStatus: 0,
        errorLabel: '',
      })
    }

    case AuthActionTypes.NAV_MENU_LAYOUT_SHOW: {
      return {
        ...state,
        showNavMenu: true,
      }
    }

    case AuthActionTypes.NAV_MENU_LAYOUT_HIDE: {
      return {
        ...state,
        showNavMenu: false,
      }
    }

    case AuthActionTypes.CHANGE_LANGUAGE: {
      return { ...state, language: action.payload.language }
    }

    default:
      return state
  }
}
