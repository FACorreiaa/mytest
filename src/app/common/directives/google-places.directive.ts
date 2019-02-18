import { Directive, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core'
import { OpeningTimes, DaysCodes } from '@app/api/models/api-models'

declare var google: any

@Directive({ selector: '[google-place]' })
export class GooglePlacesDirective implements AfterViewInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter()
  private element: HTMLInputElement

  constructor(elRef: ElementRef) {
    this.element = elRef.nativeElement
  }

  ngAfterViewInit(): void {
    if (google) {
      const autocomplete = new google.maps.places.Autocomplete(this.element)
      autocomplete.setComponentRestrictions({ country: ['de', 'pt'] })

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()))
      })
    }
  }

  private getFormattedAddress(place: any) {
    let location = []
    if (!place.address_components) {
      return null
    }

    const openingHours = this.buildOpeningHours(place.opening_hours.periods)
    location = this.buildAddress(place.address_components)

    location['location'] = place.name
    location['address'] = place.formatted_address.split(',').splice(0, 1)
    location['openingHours'] = openingHours
    location['phone_number'] = place.formatted_phone_number ? place.formatted_phone_number.replace(/ /g, '') : ''
    location['website'] = place.website
      ? place.website
          .replace('https://', '')
          .replace('http://', '')
          .replace('www.', '')
      : ''

    return location
  }

  private buildAddress(addressComponents): any[] {
    const obj = []
    for (let i = 0; i < addressComponents.length; i++) {
      const item = addressComponents[i]

      if (item['types'].indexOf('locality') > -1) {
        obj['locality'] = item['long_name']
      } else if (item['types'].indexOf('street_number') > -1) {
        obj['street_number'] = item['short_name']
      } else if (item['types'].indexOf('country') > -1) {
        obj['country'] = item['long_name']
      } else if (item['types'].indexOf('postal_code') > -1) {
        obj['postal_code'] = item['short_name']
      }
    }

    return obj
  }

  private buildOpeningHours(openingHours: Array<any>): OpeningTimes {
    const openingTimes: OpeningTimes = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    }

    for (let index = 0; index <= 6; index++) {
      const days = openingHours.filter((x: any) => x.open.day === index && x.close.day === index)

      switch (index) {
        case DaysCodes.sunday:
          if (days.length === 0) {
            break
          }

          openingTimes.sunday.push({ startTime: days[0].open.hours + ':00', endTime: days[0].close.hours + ':00' })
          if (days.length > 1) {
            openingTimes.sunday.push({ startTime: days[1].open.hours + ':00', endTime: days[1].close.hours + ':00' })
          }
          break
        case DaysCodes.monday:
          if (days.length === 0) {
            break
          }

          openingTimes.monday.push({ startTime: days[0].open.hours + ':00', endTime: days[0].close.hours + ':00' })
          if (days.length > 1) {
            openingTimes.monday.push({ startTime: days[1].open.hours + ':00', endTime: days[1].close.hours + ':00' })
          }
          break
        case DaysCodes.tuesday:
          if (days.length === 0) {
            break
          }

          openingTimes.tuesday.push({ startTime: days[0].open.hours + ':00', endTime: days[0].close.hours + ':00' })
          if (days.length > 1) {
            openingTimes.tuesday.push({ startTime: days[1].open.hours + ':00', endTime: days[1].close.hours + ':00' })
          }
          break
        case DaysCodes.wednesday:
          if (days.length === 0) {
            break
          }

          openingTimes.wednesday.push({ startTime: days[0].open.hours + ':00', endTime: days[0].close.hours + ':00' })
          if (days.length > 1) {
            openingTimes.wednesday.push({ startTime: days[1].open.hours + ':00', endTime: days[1].close.hours + ':00' })
          }
          break
        case DaysCodes.thursday:
          if (days.length === 0) {
            break
          }

          openingTimes.thursday.push({ startTime: days[0].open.hours + ':00', endTime: days[0].close.hours + ':00' })
          if (days.length > 1) {
            openingTimes.thursday.push({ startTime: days[1].open.hours + ':00', endTime: days[1].close.hours + ':00' })
          }
          break
        case DaysCodes.friday:
          if (days.length === 0) {
            break
          }

          openingTimes.friday.push({ startTime: days[0].open.hours + ':00', endTime: days[0].close.hours + ':00' })
          if (days.length > 1) {
            openingTimes.friday.push({ startTime: days[1].open.hours + ':00', endTime: days[1].close.hours + ':00' })
          }
          break
        case DaysCodes.saturday:
          if (days.length === 0) {
            break
          }

          openingTimes.saturday.push({ startTime: days[0].open.hours + ':00', endTime: days[0].close.hours + ':00' })
          if (days.length > 1) {
            openingTimes.saturday.push({ startTime: days[1].open.hours + ':00', endTime: days[1].close.hours + ':00' })
          }
          break
        default:
          break
      }
    }

    return openingTimes
  }
}
