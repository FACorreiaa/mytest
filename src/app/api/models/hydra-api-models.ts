interface IHydraResponse {
  status: number
  message: string
}

interface IHydraRestaurantDetailsResponse extends IHydraResponse {
  establishment: IHydraRestaurant
}

interface IHydraTimeInterval {
  intervalId: number
  startTime: string
  endTime: string
}

interface IHydraOpeningTime {
  openingTimeId: number
  name: string
  startDate: string
  endDate: string
  weekday: number
  timeIntervals: [IHydraTimeInterval]
}

interface IHydraRestaurant {
  restaurantId: string
  url: string
  isPrimary: boolean
  salesforceId: string
  country: string
  name: string
  address1: string
  address2: string
  zipCode: string
  city: string
  latitude: string
  longitude: string
  welcomeTitle: string
  description: string
  businessType: string
  email: string
  isOnline: boolean
  automaticDescriptionEnabled: boolean
  coverImageUrlHuge: string
  coverImageUrlBig: string
  coverImageUrlMedium: string
  coverImageLastModificationDate: Date
  openingTimes: [IHydraOpeningTime]
}
