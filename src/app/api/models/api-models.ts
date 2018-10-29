import { Action as StoreAction } from '@ngrx/store'

export interface UserRegisterDto {
  user: UserLoginDto
  claim: Data
}

export interface UserLoginDto {
  email: string
  password: string
}

export interface Action extends StoreAction {
  payload: any
}

export interface Welcome {
  channels: string[]
  data: Data
}

export interface Data {
  businessUnitId: string
  userFirstName: string
  userLastName: string
  name: string
  additional: string
  street: string
  zipCode: number
  city: string
  countryCode: string
  url: string
  contactEmail: string
  contactPhoneNumber: string
  openingTimes: OpeningTimes
  specialOpeningTimes: SpecialOpeningTime[]
  offerTypes: string[]
  description: string
  imprint: { [key: string]: null | string }
  category: string
  services: string[]
  paymentMethods: string[]
  reservationUri: string
  menuUri: string
  profileImageUri: string
  titleImageUri: string
  stories: Story[]
}

export interface OpeningTimes {
  monday: Day[]
  tuesday: Day[]
  wednesday: Day[]
  thursday: Day[]
  friday: any[]
  saturday: Day[]
  sunday: Day[]
}

export interface Day {
  startTime: string
  endTime: string
}

export interface OpeningDays {
  day: string
  startTime: string
  endTime: string
}

export interface SpecialOpeningTime {
  startDate: string
  openTime?: string
  endDate?: string
  closeTime?: string
  isClosed?: boolean
}

export interface Story {
  headline: string
  text: string
  createdAt: string
  mediaUri: null
}

export function OpenHoursArray(): IHours[] {
  return Hours
}

export interface IHours {
  key: string
  value: string
}

const Hours = [
  { key: '1', value: '1:00' },
  { key: '2', value: '2:00' },
  { key: '3', value: '3:00' },
  { key: '4', value: '4:00' },
  { key: '5', value: '5:00' },
  { key: '6', value: '6:00' },
  { key: '7', value: '7:00' },
  { key: '8', value: '8:00' },
  { key: '9', value: '9:00' },
  { key: '10', value: '10:00' },
  { key: '11', value: '11:00' },
  { key: '12', value: '12:00' },
  { key: '13', value: '13:00' },
  { key: '14', value: '14:00' },
  { key: '15', value: '15:00' },
  { key: '16', value: '16:00' },
  { key: '17', value: '17:00' },
  { key: '18', value: '18:00' },
  { key: '19', value: '19:00' },
  { key: '20', value: '20:00' },
  { key: '21', value: '21:00' },
  { key: '22', value: '22:00' },
  { key: '23', value: '23:00' },
  { key: '24', value: '24:00' },
]

export interface ICategory {
  name: string
  selected: boolean
}

export function CategoriesArray(): ICategory[] {
  return Cuisines
}

const Cuisines = [
  { name: 'bakery', selected: false },
  { name: 'bar', selected: false },
  { name: 'bistro', selected: false },
  { name: 'butcher', selected: false },
  { name: 'canteen', selected: false },
  { name: 'catering', selected: false },
  { name: 'confectionery', selected: false },
  { name: 'cookingSchool', selected: false },
  { name: 'creperie', selected: false },
  { name: 'diner', selected: false },
  { name: 'foodtruck', selected: false },
  { name: 'heuriger', selected: false },
  { name: 'hotel', selected: false },
  { name: 'kiosk', selected: false },
  { name: 'nightClub', selected: false },
  { name: 'restaurant', selected: false },
  { name: 'shishaBar', selected: false },
]

// KAI Back-End Data

export interface Address {
  zip: string
  city: string
  street: string
  streetNumber: string
  additional: string
}

export interface OpeningTimes {
  monday: Day[]
  tuesday: Day[]
  wednesday: Day[]
  thursday: Day[]
  sunday: Day[]
}

export interface ManageBusinessObject {
  address: Address
  category: string
  name: string
  description: string
  userFirstName: string
  userLastName: string
  countryCode: string
  languageCode: string
  url: string
  contactEmail: string
  contactPhoneNumber: string
  reservationUri: string
  menuUri: string
  profileImageUri: string
  titleImageUri: string
  openingTimes: OpeningTimes
  offers: string[]
  services: string[]
  paymentMethods: string[]
  channels: string[]
}
