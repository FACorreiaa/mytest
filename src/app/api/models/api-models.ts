import { Action as StoreAction } from '@ngrx/store'
import { HttpHeaders, HttpParams } from '@angular/common/http'

export interface BaseServiceResponse<T> {
  status: number
  data: T[]
  message?: string
}

export interface RequestAdminRightsBusinessId {
  businessUnitId: number
  channel: string
}

export interface RequestAdminRightsBusinessData {
  businessUnit: BusinessData
  suppressAutoVerify: boolean
  locationName: string
  placeId: string
  requestAdminRightsUrl: string
  channel: string
  zipCode: string
}

export interface TermsConditionsGetResponse {
  userId: string
  accepted: boolean
  createdAt: string
  updatedAt: string
}

export interface TermsConditionsPostRequest {
  accepted: boolean
}

export interface FetchVerificationRequest {
  languageCode: string
}

export interface FetchVerificationResponse {
  options: GoogleVerificationOptions
}

export interface GoogleVerificationOptions {
  selectedOption: string
  options: VerificationOptions[]
}

export interface VerificationOptions {
  verificationMethod: OptionsVerificationType
  emailData?: EmailData
  phoneData?: PhoneData
  addressData?: AddressData
}

export interface EmailData {
  domainName: string
  userName: string
  isUserNameEditable: boolean
}

export interface PhoneData {
  phoneNumber: string
}

export interface AddressData {
  businessName: string
  address: Address
}

export interface Address {
  regionCode: string
  languageCode: string
  postalCode: string
  locality: string
  addressLines: Array<string>
}

export enum OptionsVerificationType {
  EMAIL = 'EMAIL',
  PHONE_CALL = 'PHONE_CALL',
  SMS = 'SMS',
  ADDRESS = 'ADDRESS',
}

export interface InitVerificationEvent {
  id: number
  request: InitVerificationRequest
}

export interface InitVerificationRequest {
  method: string
  input: any
  languageCode: string
}

export interface InitVerificationResponse {
  GOOGLE_MY_BUSINESS: GoogleStatusResponse
}

export interface CompleteVerificationEvent {
  id: number
  request: CompleteVerificationRequest
}

export interface CompleteVerificationRequest {
  pin: string
}

export interface CompleteVerificationResponse {
  GOOGLE_MY_BUSINESS: GoogleStatusResponse
}

export interface GoogleStatusResponse {
  name: string
  method: string
  createTime: string
  state: string
}

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

export interface IRequestOptionsText {
  headers?: HttpHeaders
  observe?: 'body'
  params?: HttpParams
  reportProgress?: boolean
  responseType: 'text'
  withCredentials?: boolean
}

export interface Action extends StoreAction {
  payload: any
}

export interface ManageBusinessData {
  data: BusinessData
  channels: string[]
}

export interface BusinessUnitManageResponse {
  GOOGLE_MY_BUSINESS: BusinessUnitManageGoogle
}

export interface BusinessUnitManageGoogle {
  status: number
  message: string
  requestBody: LocationData
}

export interface LocationData {
  locationName: string
  placeId: string
  requestAdminRightsUrl: string
  channel: string
  zipCode: string
  businessUnit: ManageBusinessData
}

export interface DeleteBusinessData {
  id: number
  data: BusinessData
  channels: string[]
}

export interface BusinessData {
  channels?: Channels[]
  id?: number
  zipCode: string
  city: string
  street: string
  additional: string
  category: string
  name: string

  description: string
  userFirstName?: string
  userLastName?: string
  country?: string
  countryCode: string
  languageCode: string
  url?: string
  contactEmail?: string
  contactPhoneNumber: string

  reservationUri?: string
  menuUri?: string
  profileImageUri?: string
  titleImageUri?: string
  keywords?: string[]
  languages?: string[]
  contactMobileNumber?: string
  openingTimes: OpeningTimes
  offers?: string[]
  services?: string[]
  paymentMethods?: string[]
  stories?: Stories[]
}

export interface Stories {
  headline: string
  text: string
  mediaUri: string
  createdStoryAt: string
}

export interface Channels {
  awaitingOwnership: string
  requestAdminRightsUrl?: string
  callbackUrl: string
  channel: string
  errorCode: string
  verificationNeeded: boolean
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
  { key: '01:00', value: '01:00' },
  { key: '01:15', value: '01:15' },
  { key: '01:30', value: '01:30' },
  { key: '01:45', value: '01:45' },

  { key: '02:00', value: '02:00' },
  { key: '02:15', value: '02:15' },
  { key: '02:30', value: '02:30' },
  { key: '02:45', value: '02:45' },

  { key: '03:00', value: '03:00' },
  { key: '03:15', value: '03:15' },
  { key: '03:30', value: '03:30' },
  { key: '03:45', value: '03:45' },

  { key: '04:00', value: '04:00' },
  { key: '04:15', value: '04:15' },
  { key: '04:30', value: '04:30' },
  { key: '04:45', value: '04:45' },

  { key: '05:00', value: '05:00' },
  { key: '05:15', value: '05:15' },
  { key: '05:30', value: '05:30' },
  { key: '05:45', value: '05:45' },

  { key: '06:00', value: '06:00' },
  { key: '06:15', value: '06:15' },
  { key: '06:30', value: '06:30' },
  { key: '06:45', value: '06:45' },

  { key: '07:00', value: '07:00' },
  { key: '07:15', value: '07:15' },
  { key: '07:30', value: '07:30' },
  { key: '07:45', value: '07:45' },

  { key: '08:00', value: '08:00' },
  { key: '08:15', value: '08:15' },
  { key: '08:30', value: '08:30' },
  { key: '08:45', value: '08:45' },

  { key: '09:00', value: '09:00' },
  { key: '09:15', value: '09:15' },
  { key: '09:30', value: '09:30' },
  { key: '09:45', value: '09:45' },

  { key: '10:00', value: '10:00' },
  { key: '10:15', value: '10:15' },
  { key: '10:30', value: '10:30' },
  { key: '10:45', value: '10:45' },

  { key: '11:00', value: '11:00' },
  { key: '11:15', value: '11:15' },
  { key: '11:30', value: '11:30' },
  { key: '11:45', value: '11:45' },

  { key: '12:00', value: '12:00' },
  { key: '12:15', value: '12:15' },
  { key: '12:30', value: '12:30' },
  { key: '12:45', value: '12:45' },

  { key: '13:00', value: '13:00' },
  { key: '13:15', value: '13:15' },
  { key: '13:30', value: '13:30' },
  { key: '13:45', value: '13:45' },

  { key: '14:00', value: '14:00' },
  { key: '14:15', value: '14:15' },
  { key: '14:30', value: '14:30' },
  { key: '14:45', value: '14:45' },

  { key: '15:00', value: '15:00' },
  { key: '15:15', value: '15:15' },
  { key: '15:30', value: '15:30' },
  { key: '15:45', value: '15:45' },

  { key: '16:00', value: '16:00' },
  { key: '16:15', value: '16:15' },
  { key: '16:30', value: '16:30' },
  { key: '16:45', value: '16:45' },

  { key: '17:00', value: '17:00' },
  { key: '17:15', value: '17:15' },
  { key: '17:30', value: '17:30' },
  { key: '17:45', value: '17:45' },

  { key: '18:00', value: '18:00' },
  { key: '18:15', value: '18:15' },
  { key: '18:30', value: '18:30' },
  { key: '18:45', value: '18:45' },

  { key: '19:00', value: '19:00' },
  { key: '19:15', value: '19:15' },
  { key: '19:30', value: '19:30' },
  { key: '19:45', value: '19:45' },

  { key: '20:00', value: '20:00' },
  { key: '20:15', value: '20:15' },
  { key: '20:30', value: '20:30' },
  { key: '20:45', value: '20:45' },

  { key: '21:00', value: '21:00' },
  { key: '21:15', value: '21:15' },
  { key: '21:30', value: '21:30' },
  { key: '21:45', value: '21:45' },

  { key: '22:00', value: '22:00' },
  { key: '22:15', value: '22:15' },
  { key: '22:30', value: '22:30' },
  { key: '22:45', value: '22:45' },

  { key: '23:00', value: '23:00' },
  { key: '23:15', value: '23:15' },
  { key: '23:30', value: '23:30' },
  { key: '23:45', value: '23:45' },

  { key: '24:00', value: '24:00' },
  { key: '24:15', value: '24:15' },
  { key: '24:30', value: '24:30' },
  { key: '24:45', value: '24:45' },
]

export interface ICategoryDto {
  id: string
  category: string
  value: string[]
  selected: boolean
}

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

export enum Role {
  user,
  admin,
  superadmin
}
