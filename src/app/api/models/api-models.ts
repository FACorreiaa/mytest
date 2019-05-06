import { Action as StoreAction } from '@ngrx/store'
import { HttpHeaders, HttpParams } from '@angular/common/http'

export interface KeycloakModel {
  readonly isLoggedIn: boolean
  readonly showLoading: boolean
  readonly id: string
  readonly needsLogin: boolean
}

export interface KeycloakLoginCheckResponse {
  loggedIn: boolean
  idmId: string
}

export interface IRequestOptions {
  headers?: HttpHeaders
  observe?: 'body'
  params?: HttpParams
  reportProgress?: boolean
  responseType?: 'json'
  withCredentials?: boolean
  body?: any
}

export interface UserRegisterDto {
  user: UserLoginDto
  claim: ManageBusinessData
}

export interface UserLoginDto {
  email: string
  password: string
}

export interface Action extends StoreAction {
  payload: any
}

export interface ManageBusinessData {
  data: Data
  channels: string[]
}

export interface DeleteBusinessData {
  id: number
  data: Data
  channels: string[]
}

export interface Data {
  id?: number
  zipCode: string
  city: string
  street: string
  additional: string
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
  openingTimes: OpeningTimes
  offers: string[]
  services: string[]
  paymentMethods: string[]
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

export enum DaysCodes {
  sunday = 0,
  monday = 1,
  tuesday = 2,
  wednesday = 3,
  thursday = 4,
  friday = 5,
  saturday = 6,
}

export function OpenHoursArray(): IHours[] {
  return Hours
}

export interface IHours {
  key: string
  value: string
}

const Hours = [
  { key: '1:00', value: '1:00' },
  { key: '2:00', value: '2:00' },
  { key: '3:00', value: '3:00' },
  { key: '4:00', value: '4:00' },
  { key: '5:00', value: '5:00' },
  { key: '6:00', value: '6:00' },
  { key: '7:00', value: '7:00' },
  { key: '8:00', value: '8:00' },
  { key: '9:00', value: '9:00' },
  { key: '10:00', value: '10:00' },
  { key: '11:00', value: '11:00' },
  { key: '12:00', value: '12:00' },
  { key: '13:00', value: '13:00' },
  { key: '14:00', value: '14:00' },
  { key: '15:00', value: '15:00' },
  { key: '16:00', value: '16:00' },
  { key: '17:00', value: '17:00' },
  { key: '18:00', value: '18:00' },
  { key: '19:00', value: '19:00' },
  { key: '20:00', value: '20:00' },
  { key: '21:00', value: '21:00' },
  { key: '22:00', value: '22:00' },
  { key: '23:00', value: '23:00' },
  { key: '24:00', value: '24:00' },
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
  { name: 'dinner', selected: false },
  { name: 'foodtruck', selected: false },
  { name: 'heuriger', selected: false },
  { name: 'hotel', selected: false },
  { name: 'kiosk', selected: false },
  { name: 'nightClub', selected: false },
  { name: 'restaurant', selected: false },
  { name: 'shishaBar', selected: false },
]

export interface Countries {
  code: string
  name: string
}
