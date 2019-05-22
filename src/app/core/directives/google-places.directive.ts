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
      const autocomplete = new google.maps.places.Autocomplete(this.element, { types: ['establishment'] })
      autocomplete.setComponentRestrictions({ country: ['de', 'pt', 'it'] })

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

    const openingHours = place.opening_hours !== undefined ? this.buildOpeningHours(place.opening_hours.periods) : null
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
      const days = openingHours.filter((x: any) => x.open.day === index)
      console.log('days google', days)
      switch (index) {
        case DaysCodes.sunday:
          if (days.length === 0) {
            break
          }
          openingTimes.sunday.push(this.buildTimes(days[0]))
          if (days.length > 1) {
            openingTimes.sunday.push(this.buildTimes(days[1]))
          }
          break
        case DaysCodes.monday:
          if (days.length === 0) {
            break
          }
          openingTimes.monday.push(this.buildTimes(days[0]))
          if (days.length > 1) {
            openingTimes.monday.push(this.buildTimes(days[1]))
          }
          break
        case DaysCodes.tuesday:
          if (days.length === 0) {
            break
          }
          openingTimes.tuesday.push(this.buildTimes(days[0]))
          if (days.length > 1) {
            openingTimes.tuesday.push(this.buildTimes(days[1]))
          }
          break
        case DaysCodes.wednesday:
          if (days.length === 0) {
            break
          }
          openingTimes.wednesday.push(this.buildTimes(days[0]))
          if (days.length > 1) {
            openingTimes.wednesday.push(this.buildTimes(days[1]))
          }
          break
        case DaysCodes.thursday:
          if (days.length === 0) {
            break
          }
          openingTimes.thursday.push(this.buildTimes(days[0]))
          if (days.length > 1) {
            openingTimes.thursday.push(this.buildTimes(days[1]))
          }
          break
        case DaysCodes.friday:
          if (days.length === 0) {
            break
          }
          openingTimes.friday.push(this.buildTimes(days[0]))
          if (days.length > 1) {
            openingTimes.friday.push(this.buildTimes(days[1]))
          }
          break
        case DaysCodes.saturday:
          if (days.length === 0) {
            break
          }
          openingTimes.saturday.push(this.buildTimes(days[0]))
          if (days.length > 1) {
            openingTimes.saturday.push(this.buildTimes(days[1]))
          }
          break
        default:
          break
      }
    }

    return openingTimes
  }

  private buildTimes(day: any): any {
    const times: any = {
      startTime: day.open.time.match(/.{1,2}/g)[0] + ':' + day.open.time.match(/.{1,2}/g)[1],
      endTime: day.close.time.match(/.{1,2}/g)[0] + ':' + day.close.time.match(/.{1,2}/g)[1],
    }

    return times
  }
}
